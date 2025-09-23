// import React, { useState, useMemo } from 'react';
// import { Recipe } from '@/entities/Recipe';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Checkbox } from '@/components/ui/checkbox';
// import RecipeNutritionLabel from './RecipeNutritionLabel';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Loader2, Save, AlertCircle } from 'lucide-react';
//
// const nutrientFields = [
// 	'calories', 'total_fat', 'saturated_fat', 'trans_fat', 'cholesterol',
// 	'sodium', 'total_carbohydrates', 'dietary_fiber', 'total_sugars',
// 	'protein', 'potassium', 'calcium', 'iron'
// ];
//
// const parseServingGrams = (servingSize) => {
// 	if (!servingSize) return null;
// 	const match = servingSize.match(/\((\d+\.?\d*)\s*g\)/);
// 	return match ? parseFloat(match[1]) : null;
// };
//
// export default function RecipeMixer({ isOpen, setIsOpen, savedRecipes, onSaveSuccess }) {
// 	const [selected, setSelected] = useState({});
// 	const [amounts, setAmounts] = useState({});
// 	const [newName, setNewName] = useState('');
// 	const [isSaving, setIsSaving] = useState(false);
//
// 	const eligibleRecipes = useMemo(() =>
// 			savedRecipes.filter(r => parseServingGrams(r.serving_size)),
// 		[savedRecipes]);
//
// 	const mixedRecipe = useMemo(() => {
// 		const newRecipe = { name: newName, ...nutrientFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {}) };
// 		let totalGrams = 0;
//
// 		for (const recipeId in selected) {
// 			if (selected[recipeId]) {
// 				const recipe = savedRecipes.find(r => r.id === recipeId);
// 				const servingGrams = parseServingGrams(recipe.serving_size);
// 				const mixGrams = parseFloat(amounts[recipeId]) || 0;
//
// 				if (mixGrams > 0) {
// 					totalGrams += mixGrams;
// 					nutrientFields.forEach(field => {
// 						const nutrientPerGram = (recipe[field] || 0) / servingGrams;
// 						newRecipe[field] += nutrientPerGram * mixGrams;
// 					});
// 				}
// 			}
// 		}
//
// 		newRecipe.serving_size = `1 serving (${Math.round(totalGrams)}g)`;
// 		return totalGrams > 0 ? newRecipe : null;
// 	}, [selected, amounts, newName, savedRecipes]);
//
// 	const handleSave = async () => {
// 		if (!mixedRecipe || !mixedRecipe.name) return;
// 		setIsSaving(true);
// 		const { name, serving_size, ...nutrients } = mixedRecipe;
// 		const finalData = {
// 			name,
// 			serving_size,
// 			image_url: '', // Mixer doesn't handle images for now
// 			...nutrients
// 		};
// 		const saved = await Recipe.create(finalData);
// 		onSaveSuccess(saved);
// 		setIsSaving(false);
// 		setIsOpen(false);
// 		// Reset state
// 		setSelected({});
// 		setAmounts({});
// 		setNewName('');
// 	};
//
// 	return (
// 		<Dialog open={isOpen} onOpenChange={setIsOpen}>
// 			<DialogContent className="max-w-4xl">
// 				<DialogHeader>
// 					<DialogTitle>Recipe Mixer</DialogTitle>
// 					<DialogDescription>
// 						Create a new recipe by mixing amounts from your saved recipes.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="grid md:grid-cols-2 gap-6 py-4 max-h-[70vh]">
// 					{/* Left: Selection and Amounts */}
// 					<div className="space-y-4">
// 						<h3 className="font-semibold">1. Select Recipes & Amounts</h3>
// 						{eligibleRecipes.length === 0 && (
// 							<Alert variant="destructive">
// 								<AlertCircle className="h-4 w-4" />
// 								<AlertDescription>
// 									No saved recipes with a valid serving size in grams (e.g., "1 cup (227g)") are available to mix.
// 								</AlertDescription>
// 							</Alert>
// 						)}
// 						<ScrollArea className="h-72 border rounded-md p-4">
// 							<div className="space-y-4">
// 								{eligibleRecipes.map(recipe => (
// 									<div key={recipe.id} className="flex items-center gap-4">
// 										<Checkbox
// 											id={`check-${recipe.id}`}
// 											checked={!!selected[recipe.id]}
// 											onCheckedChange={checked => setSelected(p => ({ ...p, [recipe.id]: checked }))}
// 										/>
// 										<Label htmlFor={`check-${recipe.id}`} className="flex-grow">{recipe.name}</Label>
// 										<Input
// 											type="number"
// 											placeholder="grams"
// 											className="w-24"
// 											disabled={!selected[recipe.id]}
// 											value={amounts[recipe.id] || ''}
// 											onChange={e => setAmounts(p => ({ ...p, [recipe.id]: e.target.value }))}
// 										/>
// 									</div>
// 								))}
// 							</div>
// 						</ScrollArea>
// 						<div className="space-y-2">
// 							<Label htmlFor="new-name">2. Name Your New Mix</Label>
// 							<Input id="new-name" placeholder="e.g., Power Lunch Mix" value={newName} onChange={e => setNewName(e.target.value)} />
// 						</div>
// 					</div>
// 					{/* Right: Preview */}
// 					<div className="flex flex-col items-center">
// 						<h3 className="font-semibold mb-4">3. Preview Nutrition Label</h3>
// 						<RecipeNutritionLabel profile={mixedRecipe} />
// 					</div>
// 				</div>
// 				<DialogFooter>
// 					<Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
// 					<Button onClick={handleSave} disabled={!mixedRecipe || !mixedRecipe.name || isSaving}>
// 						{isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// 						Save Mixed Recipe
// 					</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

import React from 'react'


const RecipeMixer = () => {
	return (
		<div>RecipeMixer</div>
	)
}
export default RecipeMixer
