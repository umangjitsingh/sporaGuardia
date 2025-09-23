// import React, { useState, useEffect, useCallback } from 'react';
// import {Recipe } from '../../recipe.js';
// import RecipeForm from './RecipeForm.jsx';
// import RecipeNutritionLabel from './RecipeNurtitionLabel.jsx';
// import SavedRecipesList from './SavedRecipiesList.jsx';
// import Button  from '../Button.jsx';
// import { PlusCircle } from 'lucide-react';
//
// export default function ResearcherZone({ user }) {
// 	const [recipes, setRecipes] = useState([]);
// 	const [selectedRecipe, setSelectedRecipe] = useState(null);
// 	const [currentRecipeData, setCurrentRecipeData] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
//
// 	const loadRecipes = useCallback(async () => {
// 		setIsLoading(true);
// 		const userRecipes = await Recipe.filter({ created_by: user.email }, "-created_date");
// 		setRecipes(userRecipes);
// 		setIsLoading(false);
// 	}, [user.email]);
//
// 	useEffect(() => {
// 		loadRecipes();
// 	}, [loadRecipes]);
//
// 	const handleSelectRecipe = (recipe) => {
// 		setSelectedRecipe(recipe);
// 		setCurrentRecipeData(recipe);
// 	};
//
// 	const handleUpdate = (data) => {
// 		setCurrentRecipeData(data);
// 	};
//
// 	const handleSaveSuccess = (savedRecipe) => {
// 		setRecipes(prev => [savedRecipe, ...prev.filter(r => r.id !== savedRecipe.id)]);
// 		setSelectedRecipe(savedRecipe);
// 		setCurrentRecipeData(savedRecipe);
// 	};
//
// 	const handleDeleteSuccess = (deletedId) => {
// 		setRecipes(prev => prev.filter(r => r.id !== deletedId));
// 		if (selectedRecipe?.id === deletedId) {
// 			handleNewRecipe();
// 		}
// 	};
//
// 	const handleNewRecipe = () => {
// 		setSelectedRecipe(null);
// 		setCurrentRecipeData(null);
// 	}
//
// 	return (
// 		<div className="space-y-8 ">
//
// 			<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center">
// 				<h3 className="text-lg  font-semibold text-gray-700">Your Saved Recipes</h3>
//
// 			</div>
// 			<SavedRecipesList
// 				recipes={recipes}
// 				onSelect={handleSelectRecipe}
// 				selectedId={selectedRecipe?.id}
// 				isLoading={isLoading}
// 			/>
// 			<Button onClick={handleNewRecipe} variant="outline" className="gap-2 scale-90 sm:scale-100 ">
// 				<PlusCircle className=" sm:w-8 sm:h-8 inline-flex items-center justify-between pr-2  "/>
// 				<span className="text-sm">New Recipe</span>
// 			</Button>
// 			<div className="grid lg:grid-cols-2 gap-8 items-start">
// 				<RecipeForm
// 					key={selectedRecipe?.id || 'new'}
// 					onUpdate={handleUpdate}
// 					onSaveSuccess={handleSaveSuccess}
// 					onDeleteSuccess={handleDeleteSuccess}
// 					selectedRecipe={selectedRecipe}
// 				/>
// 				<div className="sticky top-24">
// 					<h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Live Preview</h3>
// 					<div className="flex justify-center">
// 						<RecipeNutritionLabel profile={currentRecipeData} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import React, { useState, useEffect, useCallback } from 'react';
import { Recipe } from '../../recipe.js';
import RecipeForm from './RecipeForm';
import RecipeNutritionLabel from './RecipeNurtitionLabel.jsx';
import SavedRecipesList from './SavedRecipiesList.jsx';
import RecipeMixer from './RecipeMixer.jsx'; // New import
import  Button from '../button';
import { PlusCircle, Blend } from 'lucide-react'; // New import

export default function ResearcherZone({ user }) {
	const [recipes, setRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [currentRecipeData, setCurrentRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMixerOpen, setIsMixerOpen] = useState(false); // New state

	const loadRecipes = useCallback(async () => {
		setIsLoading(true);
		const userRecipes = await Recipe.filter({ created_by: user.email }, "-created_date");
		setRecipes(userRecipes);
		setIsLoading(false);
	}, [user.email]);

	useEffect(() => {
		loadRecipes();
	}, [loadRecipes]);

	const handleSelectRecipe = (recipe) => {
		setSelectedRecipe(recipe);
		setCurrentRecipeData(recipe);
	};

	const handleUpdate = (data) => {
		setCurrentRecipeData(data);
	};

	const handleSaveSuccess = (savedRecipe) => {
		// Add or update recipe in the list
		const existingIndex = recipes.findIndex(r => r.id === savedRecipe.id);
		if (existingIndex > -1) {
			const updatedRecipes = [...recipes];
			updatedRecipes[existingIndex] = savedRecipe;
			setRecipes(updatedRecipes);
		} else {
			setRecipes(prev => [savedRecipe, ...prev]);
		}

		setSelectedRecipe(savedRecipe);
		setCurrentRecipeData(savedRecipe);
	};

	const handleDeleteSuccess = (deletedId) => {
		setRecipes(prev => prev.filter(r => r.id !== deletedId));
		if (selectedRecipe?.id === deletedId) {
			handleNewRecipe();
		}
	};

	const handleNewRecipe = () => {
		setSelectedRecipe(null);
		setCurrentRecipeData(null);
	}

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-semibold text-gray-700">Your Saved Recipes</h3>
				<div className="flex gap-2">
					<Button onClick={() => setIsMixerOpen(true)} variant="secondary" className="gap-2">
						<Blend className="w-4 h-4"/>
						Recipe Mixer
					</Button>
					<Button onClick={handleNewRecipe} variant="outline" className="gap-2">
						<PlusCircle className="w-4 h-4"/>
						New Recipe
					</Button>
				</div>
			</div>
			<RecipeMixer
				isOpen={isMixerOpen}
				setIsOpen={setIsMixerOpen}
				savedRecipes={recipes}
				onSaveSuccess={handleSaveSuccess}
			/>
			<SavedRecipesList
				recipes={recipes}
				onSelect={handleSelectRecipe}
				selectedId={selectedRecipe?.id}
				isLoading={isLoading}
			/>
			<div className="grid lg:grid-cols-2 gap-8 items-start">
				<RecipeForm
					key={selectedRecipe?.id || 'new'}
					onUpdate={handleUpdate}
					onSaveSuccess={handleSaveSuccess}
					onDeleteSuccess={handleDeleteSuccess}
					selectedRecipe={selectedRecipe}
				/>
				<div className="sticky top-24">
					<h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Live Preview</h3>
					<div className="flex justify-center">
						<RecipeNutritionLabel profile={currentRecipeData} />
					</div>
				</div>
			</div>
		</div>
	);
}
