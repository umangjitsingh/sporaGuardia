import React, { useState, useEffect } from 'react';
import { Recipe } from '../../recipe.js';
import { Input } from '../ui/Input.jsx';
import { Label } from '../ui/Label.jsx';
import Button from '../Button.jsx';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { CardHeader } from '../ui/CardHeader.jsx';
import { CardTitle } from '../ui/CardTitle.jsx';
import { CardContent } from '../ui/CardContent.jsx';
import { CardFooter } from '../ui/CardFooter.jsx';
import { User } from '../../user.js'
import { Alert, AlertDescription } from '../ui/Alert.jsx';
import { AlertTitle } from '../ui/AlertTitle.jsx';


const emptyRecipe = {
	name               : '', total_weight: 0, container_name: 'container', serving_size_name: '1 serving',
	serving_size_value : 0, serving_size_unit: '', calories: 0,
	total_fat          : 0, saturated_fat: 0, trans_fat: 0, cholesterol: 0, sodium: 0,
	total_carbohydrates: 0, dietary_fiber: 0, total_sugars: 0, protein: 0,
	potassium          : 0, calcium: 0, iron: 0,added_sugars: 0,vitamin_d:0
};

export default function RecipeForm({ onUpdate, onSaveSuccess, onDeleteSuccess, selectedRecipe }) {
	const [formData, setFormData] = useState(selectedRecipe || emptyRecipe);
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setFormData(selectedRecipe || emptyRecipe);
		// setImageFile(null); // Also reset the image file when selection changes
	}, [selectedRecipe]);


	if (selectedRecipe && selectedRecipe.is_prebuilt) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{selectedRecipe.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
						<ShieldAlert className="h-4 w-4 !text-blue-800"/>
						<AlertTitle>This is a Base Recipe</AlertTitle>
						<AlertDescription>
							Pre-built base recipes cannot be edited or deleted. However, you can use them in the 'Recipe Mixer'
							to create new custom recipes.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}


	const handleInputChange = (e) => {
		const { id, value, type } = e.target;
		// const new_val = type === 'number' ? parseFloat(value) || 0 : value;
		const new_val = type === 'number' ? (value === '' ? '' : (parseFloat(value) || 0)) : value;
		const updated = { ...formData, [id]: new_val };
		setFormData(updated);
		onUpdate(updated);
	};
	//
	const nutrientFields = [
		{ id: 'calories', label: 'Calories', unit: 'kcal' },
		{ id: 'total_fat', label: 'Total Fat', unit: 'g' },
		{ id: 'saturated_fat', label: 'Saturated Fat', unit: 'g' },
		{ id: 'trans_fat', label: 'Trans Fat', unit: 'g' },
		{ id: 'total_carbohydrates', label: 'Total Carbs', unit: 'g' },
		{ id: 'dietary_fiber', label: 'Dietary Fiber', unit: 'g' },
		{ id: 'total_sugars', label: 'Total Sugars', unit: 'g' },
		{ id: 'added_sugars', label: 'Added Sugars', unit: 'g' },
		{ id: 'protein', label: 'Protein', unit: 'g' },
	];

	const mineralFields = [
		{ id: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
		{ id: 'sodium', label: 'Sodium', unit: 'mg' },
		{ id: 'potassium', label: 'Potassium', unit: 'mg' },
		{ id: 'calcium', label: 'Calcium', unit: 'mg' },
		{ id: 'iron', label: 'Iron', unit: 'mg' },
		{ id: 'vitamin_d', label: 'Vitamin D', unit: 'mcg' },
	];

	// Helper to determine if an ID is one of the numeric fields that should clear '0'
	const isClearableNumericField = (id) => {
		return [...nutrientFields, ...mineralFields].some(field => field.id === id);
	};

	const handleFocus = (e) => {
		const { id, value } = e.target;
		if (isClearableNumericField(id) && parseFloat(value) === 0) {
			const updated = { ...formData, [id]: '' };
			setFormData(updated);
			onUpdate(updated); // Update preview
		}
	};

	const handleBlur = (e) => {
		const { id, value } = e.target;
		if (isClearableNumericField(id) && value === '') {
			const updated = { ...formData, [id]: 0 };
			setFormData(updated);
			onUpdate(updated); // Update preview
		}
	};

	//


	const handleSave = async () => {

		setIsSaving(true);
		let finalData = { ...formData };

		// Clear out the ID if it exists, as we don't want to pass it to the create/update payload.
		delete finalData.id;


		if (selectedRecipe && selectedRecipe.id) {
			// It's an update
			const updatedRecipe = await Recipe.update(selectedRecipe.id, finalData);
			onSaveSuccess(updatedRecipe);
		} else {
			// It's a new creation
			const newRecipe = await Recipe.create(finalData);
			onSaveSuccess(newRecipe);
		}

		if (!selectedRecipe) {
			setFormData(emptyRecipe);
			onUpdate(null);
		}
		setIsSaving(false);
	};

	const handleDelete = async () => {
		if (!selectedRecipe) return;
		setIsDeleting(true);
		await Recipe.delete(selectedRecipe.id);
		onDeleteSuccess(selectedRecipe.id);
		setIsDeleting(false);
	};

	const inputFields = [
		{ id: 'calories', label: 'Calories', unit: 'kcal' },
		{ id: 'total_fat', label: 'Total Fat', unit: 'g' },
		{ id: 'saturated_fat', label: 'Saturated Fat', unit: 'g' },
		{ id: 'trans_fat', label: 'Trans Fat', unit: 'g' },
		{ id: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
		{ id: 'sodium', label: 'Sodium', unit: 'mg' },
		{ id: 'total_carbohydrates', label: 'Total Carbs', unit: 'g' },
		{ id: 'dietary_fiber', label: 'Dietary Fiber', unit: 'g' },
		{ id: 'total_sugars', label: 'Total Sugars', unit: 'g' },
		{ id: 'added_sugars', label: 'Added Sugars', unit: 'g' },
		{ id: 'protein', label: 'Protein', unit: 'g' },
		{ id: 'potassium', label: 'Potassium', unit: 'mg' },
		{ id: 'calcium', label: 'Calcium', unit: 'mg' },
		{ id: 'iron', label: 'Iron', unit: 'mg' },
		{ id: 'vitamin_d', label: 'Vitamin D', unit: 'mcg' },
	];

	return (
		<Card className="mt-4">
			<CardHeader>
				<CardTitle className="px-4 py-6">{selectedRecipe ? 'Edit Recipe' : 'Create New Recipe'}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Recipe Name</Label>
					<Input id="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Healthy Chicken Salad"/>
				</div>
				<div className="space-y-2 flex items-center justify-between">

					<div className="flex items-start justify-between w-full py-6">
						<div>
							<p className="text-black font-bold text-shadow-xs">Container Information</p>
							<Label htmlFor="total_weight" className="p-1">Total Weight/Size</Label>
							<Input id="total_weight" value={formData.total_weight} onChange={handleInputChange} placeholder="e.g., 700ml"/>
							<Label htmlFor="total_weight" className="p-1">Container Type</Label>
							<Input id="container_name" value={formData.container_name} onChange={handleInputChange} placeholder="e.g., container"/>
						</div>
						<div>
							<p className="text-black font-bold text-shadow-xs" >Serving Information</p>
							<Label htmlFor="container_name" className="p-1">Name</Label>
							<Input id="serving_size_name" value={formData.serving_size_name} onChange={handleInputChange} placeholder="e.g., 1 bowl "/>
							<Label htmlFor="serving_size_value" className="p-1">Value</Label>
							<Input id="serving_size_value" value={formData.serving_size_value} onChange={handleInputChange} placeholder="e.g., 100"/>
							<Label htmlFor="serving_size_unit" className="p-1">Unit</Label>
							<Input id="serving_size_unit" value={formData.serving_size_unit} onChange={handleInputChange} placeholder="e.g., ml"/>
						</div>
					</div>

				</div>

				<div className="grid sm:grid-cols-2 gap-4">
					{inputFields.map(field => (
						<div key={field.id} className="space-y-1">
							<Label htmlFor={field.id} className="text-sm">{field.label} ({field.unit})</Label>
							<Input id={field.id} type="number" value={formData[field.id]} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} min="0" step="0.1"/>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				{selectedRecipe && (
					<Button variant="destructive" onClick={handleDelete} disabled={isDeleting} size={'md'} className="flex gap-6 items-center justify-center w-48">
						{isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Trash2 className=" h-5 w-5"/>}
						Delete Recipe
					</Button>
				)}

				<Button onClick={handleSave} disabled={isSaving || !formData.name} size={'md'} className="flex gap-4 items-center justify-center w-48">
					{isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
					{selectedRecipe ? 'Update Recipe' : 'Save Recipe'}
				</Button>
			</CardFooter>
		</Card>
	);
}
