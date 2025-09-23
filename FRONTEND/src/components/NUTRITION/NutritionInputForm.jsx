import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Calculator } from 'lucide-react';

export default function NutritionInputForm({ onProfileUpdate, onSave, initialData = {} }) {
	const [profile, setProfile] = useState({
		name: '',
		serving_size: '1 serving',
		calories: 0,
		total_fat: 0,
		saturated_fat: 0,
		trans_fat: 0,
		cholesterol: 0,
		sodium: 0,
		total_carbohydrates: 0,
		dietary_fiber: 0,
		total_sugars: 0,
		protein: 0,
		potassium: 0,
		calcium: 0,
		iron: 0,
		...initialData
	});

	const handleInputChange = (field, value) => {
		const numericValue = field === 'name' || field === 'serving_size' ? value : parseFloat(value) || 0;
		const updatedProfile = { ...profile, [field]: numericValue };
		setProfile(updatedProfile);
		onProfileUpdate(updatedProfile);
	};

	const handleSave = () => {
		if (profile.name.trim()) {
			onSave(profile);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
				<CardTitle className="flex items-center gap-2 text-gray-800">
					<Calculator className="w-5 h-5" />
					Nutrition Information Input
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6 space-y-6">
				{/* Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="name" className="text-sm font-semibold text-gray-700">Food Name *</Label>
						<Input
							id="name"
							value={profile.name}
							onChange={(e) => handleInputChange('name', e.target.value)}
							placeholder="e.g., Greek Yogurt"
							className="border-2 border-gray-200 focus:border-emerald-500"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="serving_size" className="text-sm font-semibold text-gray-700">Serving Size</Label>
						<Input
							id="serving_size"
							value={profile.serving_size}
							onChange={(e) => handleInputChange('serving_size', e.target.value)}
							placeholder="e.g., 1 cup (240ml)"
							className="border-2 border-gray-200 focus:border-emerald-500"
						/>
					</div>
				</div>

				{/* Calories */}
				<div className="bg-gray-50 p-4 rounded-lg">
					<div className="space-y-2">
						<Label htmlFor="calories" className="text-sm font-semibold text-gray-700">Calories</Label>
						<Input
							id="calories"
							type="number"
							min="0"
							step="1"
							value={profile.calories}
							onChange={(e) => handleInputChange('calories', e.target.value)}
							className="border-2 border-gray-200 focus:border-emerald-500 text-lg font-semibold"
						/>
					</div>
				</div>

				{/* Macronutrients */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
						Macronutrients (grams)
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="total_fat" className="text-sm font-medium text-gray-700">Total Fat</Label>
							<Input
								id="total_fat"
								type="number"
								min="0"
								step="0.1"
								value={profile.total_fat}
								onChange={(e) => handleInputChange('total_fat', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="saturated_fat" className="text-sm font-medium text-gray-700">Saturated Fat</Label>
							<Input
								id="saturated_fat"
								type="number"
								min="0"
								step="0.1"
								value={profile.saturated_fat}
								onChange={(e) => handleInputChange('saturated_fat', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="trans_fat" className="text-sm font-medium text-gray-700">Trans Fat</Label>
							<Input
								id="trans_fat"
								type="number"
								min="0"
								step="0.1"
								value={profile.trans_fat}
								onChange={(e) => handleInputChange('trans_fat', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="total_carbohydrates" className="text-sm font-medium text-gray-700">Total Carbs</Label>
							<Input
								id="total_carbohydrates"
								type="number"
								min="0"
								step="0.1"
								value={profile.total_carbohydrates}
								onChange={(e) => handleInputChange('total_carbohydrates', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="dietary_fiber" className="text-sm font-medium text-gray-700">Dietary Fiber</Label>
							<Input
								id="dietary_fiber"
								type="number"
								min="0"
								step="0.1"
								value={profile.dietary_fiber}
								onChange={(e) => handleInputChange('dietary_fiber', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="total_sugars" className="text-sm font-medium text-gray-700">Total Sugars</Label>
							<Input
								id="total_sugars"
								type="number"
								min="0"
								step="0.1"
								value={profile.total_sugars}
								onChange={(e) => handleInputChange('total_sugars', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="protein" className="text-sm font-medium text-gray-700">Protein</Label>
							<Input
								id="protein"
								type="number"
								min="0"
								step="0.1"
								value={profile.protein}
								onChange={(e) => handleInputChange('protein', e.target.value)}
								className="border-2 border-gray-200 focus:border-blue-500"
							/>
						</div>
					</div>
				</div>

				{/* Micronutrients */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
						Micronutrients (milligrams)
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="cholesterol" className="text-sm font-medium text-gray-700">Cholesterol</Label>
							<Input
								id="cholesterol"
								type="number"
								min="0"
								step="0.1"
								value={profile.cholesterol}
								onChange={(e) => handleInputChange('cholesterol', e.target.value)}
								className="border-2 border-gray-200 focus:border-purple-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="sodium" className="text-sm font-medium text-gray-700">Sodium</Label>
							<Input
								id="sodium"
								type="number"
								min="0"
								step="0.1"
								value={profile.sodium}
								onChange={(e) => handleInputChange('sodium', e.target.value)}
								className="border-2 border-gray-200 focus:border-purple-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="potassium" className="text-sm font-medium text-gray-700">Potassium</Label>
							<Input
								id="potassium"
								type="number"
								min="0"
								step="0.1"
								value={profile.potassium}
								onChange={(e) => handleInputChange('potassium', e.target.value)}
								className="border-2 border-gray-200 focus:border-purple-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="calcium" className="text-sm font-medium text-gray-700">Calcium</Label>
							<Input
								id="calcium"
								type="number"
								min="0"
								step="0.1"
								value={profile.calcium}
								onChange={(e) => handleInputChange('calcium', e.target.value)}
								className="border-2 border-gray-200 focus:border-purple-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="iron" className="text-sm font-medium text-gray-700">Iron</Label>
							<Input
								id="iron"
								type="number"
								min="0"
								step="0.1"
								value={profile.iron}
								onChange={(e) => handleInputChange('iron', e.target.value)}
								className="border-2 border-gray-200 focus:border-purple-500"
							/>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className="pt-6 border-t border-gray-200">
					<Button
						onClick={handleSave}
						disabled={!profile.name.trim()}
						className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3"
					>
						<Save className="w-4 h-4 mr-2" />
						Save Nutrition Profile
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}