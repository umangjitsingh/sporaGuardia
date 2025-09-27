

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Recipe } from '../../recipe.js';
import RecipeForm from './RecipeForm';
import RecipeNutritionLabel from './RecipeNurtitionLabel.jsx';
import SavedRecipesList from './SavedRecipiesList.jsx';
import RecipeMixer from './RecipeMixer';
import Button  from '../Button.jsx';
import { Input } from '../ui/Input.jsx';
import { PlusCircle, Blend, Search } from 'lucide-react';

export default function ResearcherZone() {
	const [recipes, setRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [currentRecipeData, setCurrentRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMixerOpen, setIsMixerOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const loadRecipes = useCallback(async () => {
		setIsLoading(true);
		try {
			// Fetch all public recipes
			const allRecipes = await Recipe.list("-created_date");
			console.log("all recipies",allRecipes)

			setRecipes(allRecipes || []);
		} catch (error) {
			console.error('Error loading recipes:', error);
			setRecipes([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadRecipes();
	}, [loadRecipes]);

	const filteredRecipes = useMemo(() => {
		if (!searchTerm) return recipes;
		return recipes.filter(recipe =>
			recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [recipes, searchTerm]);

	const handleSelectRecipe = (recipe) => {
		setSelectedRecipe(recipe);
		setCurrentRecipeData(recipe);
	};

	const handleUpdate = (data) => {
		setCurrentRecipeData(data);
	};

	const handleSaveSuccess = (savedRecipe) => {
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
		<div className="space-y-8 ">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:justify-between gap-4 w-full ">
				<h3 className="text-xl font-semibold text-gray-700 ">Saved Recipes</h3>
				<div className="flex md:w-1/2 sm:w-auto items-center justify-center relative">

					<Input
						placeholder="Search recipes..."
						className="pl-9 w-full sm:w-96 md:w-full bg-zinc-100 outline-none "
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search className=" h-5 w-5 text-gray-500 absolute right-2"/>
				</div>
				<div className="flex  sm:w-auto flex-col sm:flex-row gap-2    w-full">

					<Button onClick={() => setIsMixerOpen(true)} variant="solid" className="gap-2">
						<Blend className="w-4 h-4"/>
						Recipe Mixer
					</Button>
					<Button onClick={handleNewRecipe} variant="solid" className="gap-2">
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
				recipes={filteredRecipes}
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