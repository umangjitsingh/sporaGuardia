const STORAGE_KEY = 'nutrition_profiles';

function getStoredProfiles() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveProfiles(profiles) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export const NutritionProfile = {
	schema: {
		name: { type: 'string' },
		serving_size: { type: 'string' },
		calories: { type: 'number' },
		total_fat: { type: 'number' },
		saturated_fat: { type: 'number' },
		trans_fat: { type: 'number' },
		cholesterol: { type: 'number' },
		sodium: { type: 'number' },
		total_carbohydrates: { type: 'number' },
		dietary_fiber: { type: 'number' },
		total_sugars: { type: 'number' },
		protein: { type: 'number' },
		potassium: { type: 'number' },
		calcium: { type: 'number' },
		iron: { type: 'number' }
	},

	async list(sortKey) {
		const all = getStoredProfiles();
		if (sortKey === '-created_date') {
			return all.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
		}
		return all;
	},

	async create(data) {
		const newProfile = {
			...data,
			id: Date.now().toString(),
			created_date: new Date().toISOString()
		};
		const all = getStoredProfiles();
		all.push(newProfile);
		saveProfiles(all);
		return newProfile;
	},

	async delete(id) {
		const all = getStoredProfiles();
		const updated = all.filter(p => p.id !== id);
		saveProfiles(updated);
	}
};