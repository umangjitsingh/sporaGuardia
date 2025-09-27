

import React, { useState, useEffect } from 'react';
import { Recipe } from '../../recipe.js';
import  UploadFile  from '../../uploadFile.js';
import { Input } from '../ui/Input.jsx';
import { Label } from '../ui/Label.jsx';
import  Button  from '../Button.jsx';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { CardHeader } from '../ui/CardHeader.jsx';
import { CardTitle } from '../ui/CardTitle.jsx';
import { CardContent } from '../ui/CardContent.jsx';
import {CardFooter} from '../ui/CardFooter.jsx';
import {User} from '../../user.js'

// const emptyRecipe = {
// 	name: '', serving_size: '1 serving', image_url: '', calories: 0,
// 	total_fat: 0, saturated_fat: 0, trans_fat: 0, cholesterol: 0, sodium: 0,
// 	total_carbohydrates: 0, dietary_fiber: 0, total_sugars: 0, protein: 0,
// 	potassium: 0, calcium: 0, iron: 0
// };
//
// export default function RecipeForm({ onUpdate, onSaveSuccess, onDeleteSuccess, selectedRecipe }) {
// 	const [formData, setFormData] = useState(selectedRecipe || emptyRecipe);
// 	const [imageFile, setImageFile] = useState(null);
// 	const [isSaving, setIsSaving] = useState(false);
// 	const [isDeleting, setIsDeleting] = useState(false);
//
// 	useEffect(() => {
// 		setFormData(selectedRecipe || emptyRecipe);
// 	}, [selectedRecipe]);
//
// 	const handleInputChange = (e) => {
// 		const { id, value, type } = e.target;
// 		const new_val = type === 'number' ? parseFloat(value) || 0 : value;
// 		const updated = { ...formData, [id]: new_val };
// 		setFormData(updated);
// 		onUpdate(updated);
// 	};
//
// 	const handleImageChange = (e) => {
// 		if (e.target.files && e.target.files[0]) {
// 			setImageFile(e.target.files[0]);
// 		}
// 	};
//
// 	//
// 	const handleSave = async () => {
// 		setIsSaving(true);
// 		try {
// 			let finalData = { ...formData };
//
// 			if (imageFile) {
// 				// const { file_url } = await UploadFile({ file: imageFile });
// 				// finalData.image_url = file_url;
// 				try {
// 					const { file_url } = await UploadFile({ file: imageFile });
// 					finalData.image_url = file_url;
// 				} catch (error) {
// 					console.error('Image upload failed:', error);
// 					// Continue without image if upload fails
// 				}
// 			}
//
// 			if (selectedRecipe?.id) {
// 				const updatedRecipe = await Recipe.update(selectedRecipe.id, finalData);
// 				onSaveSuccess(updatedRecipe);
// 			} else {
// 				// const user = await User.me();
// 				// finalData.created_by = user.email; // Add this line
// 				try {
// 					const user = await User.me();
// 					finalData.created_by = user.email;
// 				} catch (error) {
// 					console.error('User fetch failed:', error);
// 					finalData.created_by = 'anonymous@example.com';
// 				}
// 				const newRecipe = await Recipe.create(finalData);
// 				onSaveSuccess(newRecipe);
// 			}
//
// 			if (!selectedRecipe) {
// 				setFormData(emptyRecipe);
// 				setImageFile(null);
// 			}
//
//
//
// 		} catch (error) {
// 			console.error('Save failed:', error);
// 		}
// 		setIsSaving(false);
// 	};
//
// 	const handleDelete = async () => {
// 		if (!selectedRecipe) return;
// 		setIsDeleting(true);
// 		await Recipe.delete(selectedRecipe.id);
// 		onDeleteSuccess(selectedRecipe.id);
// 		setIsDeleting(false);
// 	};
//
// 	const inputFields = [
// 		{ id: 'calories', label: 'Calories', unit: 'kcal' },
// 		{ id: 'total_fat', label: 'Total Fat', unit: 'g' },
// 		{ id: 'saturated_fat', label: 'Saturated Fat', unit: 'g' },
// 		{ id: 'trans_fat', label: 'Trans Fat', unit: 'g' },
// 		{ id: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
// 		{ id: 'sodium', label: 'Sodium', unit: 'mg' },
// 		{ id: 'total_carbohydrates', label: 'Total Carbs', unit: 'g' },
// 		{ id: 'dietary_fiber', label: 'Dietary Fiber', unit: 'g' },
// 		{ id: 'total_sugars', label: 'Total Sugars', unit: 'g' },
// 		{ id: 'protein', label: 'Protein', unit: 'g' },
// 		{ id: 'potassium', label: 'Potassium', unit: 'mg' },
// 		{ id: 'calcium', label: 'Calcium', unit: 'mg' },
// 		{ id: 'iron', label: 'Iron', unit: 'mg' },
// 	];
//
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>{selectedRecipe ? 'Edit Recipe' : 'Create New Recipe'}</CardTitle>
// 			</CardHeader>
// 			<CardContent className="space-y-4">
// 				<div className="space-y-2">
// 					<Label htmlFor="name">Recipe Name</Label>
// 					<Input id="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Healthy Chicken Salad" />
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="serving_size">Serving Size</Label>
// 					<Input id="serving_size" value={formData.serving_size} onChange={handleInputChange} placeholder="e.g., 1 bowl (300g)" />
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="image">Recipe Image</Label>
// 					<Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
// 					{formData.image_url && !imageFile && <img src={formData.image_url} alt="Recipe" className="mt-2 rounded-md h-24 w-24 object-cover"/>}
// 				</div>
// 				<div className="grid sm:grid-cols-2 gap-4">
// 					{inputFields.map(field => (
// 						<div key={field.id} className="space-y-1">
// 							<Label htmlFor={field.id} className="text-sm">{field.label} ({field.unit})</Label>
// 							<Input id={field.id} type="number" value={formData[field.id]} onChange={handleInputChange} min="0" step="0.1" />
// 						</div>
// 					))}
// 				</div>
// 			</CardContent>
// 			<CardFooter className="flex justify-between">
// 				{selectedRecipe && (
// 					<Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
// 						{isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Trash2 className="mr-2 h-4 w-4"/>}
// 						Delete
// 					</Button>
// 				)}
// 				{!selectedRecipe && <div></div>}
// 				<Button onClick={handleSave} disabled={isSaving || !formData.name}>
// 					{isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
// 					{selectedRecipe ? 'Update Recipe' : 'Save Recipe'}
// 				</Button>
// 			</CardFooter>
// 		</Card>
// 	);
// }
//

const emptyRecipe = {
	name: '', serving_size: '1 serving', image_url: '', calories: 0,
	total_fat: 0, saturated_fat: 0, trans_fat: 0, cholesterol: 0, sodium: 0,
	total_carbohydrates: 0, dietary_fiber: 0, total_sugars: 0, protein: 0,
	potassium: 0, calcium: 0, iron: 0
};

export default function RecipeForm({ onUpdate, onSaveSuccess, onDeleteSuccess, selectedRecipe }) {
	const [formData, setFormData] = useState(selectedRecipe || emptyRecipe);
	const [imageFile, setImageFile] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setFormData(selectedRecipe || emptyRecipe);
		setImageFile(null); // Also reset the image file when selection changes
	}, [selectedRecipe]);

	const handleInputChange = (e) => {
		const { id, value, type } = e.target;
		const new_val = type === 'number' ? parseFloat(value) || 0 : value;
		const updated = { ...formData, [id]: new_val };
		setFormData(updated);
		onUpdate(updated);
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleSave = async () => {
		console.log("umang")

		setIsSaving(true);
		let finalData = { ...formData };

		// Clear out the ID if it exists, as we don't want to pass it to the create/update payload.
		delete finalData.id;

		if (imageFile) {
			const { file_url } = await UploadFile({ file: imageFile });
			finalData.image_url = file_url;
		}

		if (selectedRecipe && selectedRecipe.id) {
			// It's an update
			const updatedRecipe = await Recipe.update(selectedRecipe.id, finalData);
			onSaveSuccess(updatedRecipe);
		} else {
			// It's a new creation
			const newRecipe = await Recipe.create(finalData);
			onSaveSuccess(newRecipe);
		}

		// This was the area with the issue.
		// We should only reset the form if we are creating a *new* recipe.
		if (!selectedRecipe) {
			setFormData(emptyRecipe);
			setImageFile(null);
			// Also inform parent to clear the preview
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
		{ id: 'protein', label: 'Protein', unit: 'g' },
		{ id: 'potassium', label: 'Potassium', unit: 'mg' },
		{ id: 'calcium', label: 'Calcium', unit: 'mg' },
		{ id: 'iron', label: 'Iron', unit: 'mg' },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>{selectedRecipe ? 'Edit Recipe' : 'Create New Recipe'}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Recipe Name</Label>
					<Input id="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Healthy Chicken Salad" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="serving_size">Serving Size</Label>
					<Input id="serving_size" value={formData.serving_size} onChange={handleInputChange} placeholder="e.g., 1 bowl (300g)" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="image">Recipe Image</Label>
					<Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
					{formData.image_url && !imageFile && <img src={formData.image_url} alt="Recipe" className="mt-2 rounded-md h-24 w-24 object-cover"/>}
				</div>
				<div className="grid sm:grid-cols-2 gap-4">
					{inputFields.map(field => (
						<div key={field.id} className="space-y-1">
							<Label htmlFor={field.id} className="text-sm">{field.label} ({field.unit})</Label>
							<Input id={field.id} type="number" value={formData[field.id]} onChange={handleInputChange} min="0" step="0.1" />
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
				{/*{!selectedRecipe && <div></div>}*/}
				<Button onClick={handleSave} disabled={isSaving || !formData.name} size={'md'} className="flex gap-4 items-center justify-center w-48">
					{isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
					{selectedRecipe ? 'Update Recipe' : 'Save Recipe'}
				</Button>
			</CardFooter>
		</Card>
	);
}
