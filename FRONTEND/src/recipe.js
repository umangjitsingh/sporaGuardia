const STORAGE_KEY = 'recipes';

function getStoredRecipes() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveRecipes(recipes) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export const Recipe = {
	schema: {
		name               : { type: 'string' },
		serving_size       : { type: 'string' },
		image_url          : { type: 'string' },
		calories           : { type: 'number' },
		total_fat          : { type: 'number' },
		saturated_fat      : { type: 'number' },
		trans_fat          : { type: 'number' },
		cholesterol        : { type: 'number' },
		sodium             : { type: 'number' },
		total_carbohydrates: { type: 'number' },
		dietary_fiber      : { type: 'number' },
		total_sugars       : { type: 'number' },
		protein            : { type: 'number' },
		potassium          : { type: 'number' },
		calcium            : { type: 'number' },
		iron               : { type: 'number' },
		is_prebuilt        : {
			type   : 'boolean',
			default: 'false'
		}
	},
	async list(sortKey) {
		const all = getStoredRecipes();
		if (sortKey === '-created_date') {
			return all.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
		}
		return all;
	},
	async filter(query, sortKey) {
		const all = getStoredRecipes();
		const filtered = all.filter(r => r.created_by && r.created_by === query.created_by);
		if (sortKey === '-created_date') {
			return filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
		}
		return filtered;
	},

	async create(data) {
		const newRecipe = {
			...data,
			id          : Date.now().toString(),
			created_date: new Date().toISOString(),
			created_by  : data.created_by // ✅ Add this line
		};
		const all = getStoredRecipes();
		all.push(newRecipe);
		saveRecipes(all);
		return newRecipe;
	},

	async delete(id) {
		const all = getStoredRecipes();
		const updated = all.filter(r => r.id !== id);
		saveRecipes(updated);
	},

	async update(id, data) {
		const all = getStoredRecipes();
		const index = all.findIndex(r => r.id === id);
		if (index === -1) throw new Error('Recipe not found');

		const updatedRecipe = {
			...all[index],
			...data,
			id, // Ensure ID stays the same
			updated_date: new Date().toISOString()
		};

		all[index] = updatedRecipe;
		saveRecipes(all);
		return updatedRecipe;
	}
};

