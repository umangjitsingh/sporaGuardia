

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Recipe } from '../recipe.js';
import RecipeForm from '../components/SERVICES/RecipeForm.jsx';
import RecipeNutritionLabel from '../components/SERVICES/RecipeNurtitionLabel.jsx';
import SavedRecipesList from '../components/SERVICES/SavedRecipiesList.jsx';
import RecipeMixer from '../components/SERVICES/RecipeMixer.jsx';
import Button  from '../components/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { PlusCircle, Blend, Search } from 'lucide-react';
import leaf from '../assets/leave.png'
import { PiChefHat } from "react-icons/pi";
import {Select} from "../components/ui/SelectRoot.jsx";
import {SelectItem} from '../components/ui/SelectItem.jsx';
import{SelectTrigger} from '../components/ui/SelectTrigger.jsx';
import {SelectContent} from '../components/ui/SelectContent.jsx';
import {SelectValue} from '../components/ui/SelectValue.jsx';


export default function ResearcherZone() {
	const [recipes, setRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [currentRecipeData, setCurrentRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMixerOpen, setIsMixerOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [recipeFilter, setRecipeFilter] = useState('all');

	const loadRecipes = useCallback(async () => {
		setIsLoading(true);
		try {
			// Fetch all public recipes
			const allRecipes = await Recipe.list("-created_date");
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
		let filtered = recipes;

		if (recipeFilter === 'user') {
			filtered = filtered.filter(recipe => !recipe.is_prebuilt);
		} else if (recipeFilter === 'prebuilt') {
			filtered = filtered.filter(recipe => recipe.is_prebuilt);
		}

		if (searchTerm) {
			filtered = filtered.filter(recipe =>
				recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return filtered;
	}, [recipes, searchTerm, recipeFilter]);

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

	return (<div className="p-16  ">
			<div className="space-y-4 ">


				<div className="bg-gradient-to-r from-gray-100 to-gray-300 px-12 py-8 rounded-xl shadow-lg mb-12">
					<h1 className="text-3xl font-bold text-gray-800 flex items-center gap-4 tracking-tight">
						<img src={leaf} alt="" className="h-14 w-20" />
						Nutrition Facts Calculator
					</h1>
					<p className="mt-3 text-lg text-gray-700 font-medium">
						Analyze, optimize, and visualize your recipes with precision.
					</p>
				</div>


			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:justify-between gap-4 w-full ">

				<div className="flex md:w-1/2 sm:w-auto items-center justify-center relative">

					<Input
						placeholder="Search recipes..."
						className="pl-9 py-4 w-full sm:w-96 md:w-full  outline-none bg-zinc-50 shadow-sm"
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
				<div className="bg-gradient-to-r from-gray-100 to-gray-300 p-8 rounded-lg">
					<h3 className="text-3xl font-semibold text-gray-700 leading-2 pt-8 flex items-center justify-center gap-4 font-inter tracking-tighter">Saved Recipes <PiChefHat /></h3>

					<Select value={recipeFilter} onValueChange={setRecipeFilter}>
						<SelectTrigger className="w-full sm:w-[140px] ">
							<SelectValue placeholder="Filter recipes" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Recipes</SelectItem>
							<SelectItem value="user">Your Recipes</SelectItem>
							<SelectItem value="prebuilt">Base Recipes</SelectItem>
						</SelectContent>
					</Select>

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
				</div>

	</div>

	);
}

