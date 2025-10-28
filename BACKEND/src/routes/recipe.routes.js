import express from 'express';
import Recipe from '../schema/recipe.js';
import userAuth from '../middlewares/userAuth.js';
import isResearcher from '../middlewares/isResearcher.js';


const router = express.Router();

// Recipe Routes (protected for researchers only)
router.get('/', userAuth, isResearcher, async (req, res) => {
	const { sort } = req.query;
	try {
		const recipes = await Recipe.find({}).sort(sort || '-created_date');
		res.json(recipes);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
router.get('/:id', userAuth, isResearcher, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ error: 'Recipe not found' });
		}
		res.json(recipe);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post('/', userAuth, isResearcher, async (req, res) => {
	try {
		const recipe = new Recipe({
			...req.body,
			created_by: req.user.id,
		});
		await recipe.save();
		res.status(201).json(recipe);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.put('/:id', userAuth, isResearcher, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);


		if (!recipe) {
			return res.status(404).json({ error: 'Recipe not found' });
		}
		if (recipe.isPrebuild) {
			return res.status(400).json({ message: "This recipe is not editable." })
		}
		Object.assign(recipe, req.body);
		recipe.updated_date = new Date();
		await recipe.save();
		res.json(recipe);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.delete('/:id', userAuth, isResearcher, async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndDelete(req.params.id);
		if (!recipe) {
			return res.status(404).json({ error: 'Recipe not found' });
		}
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
export default router;