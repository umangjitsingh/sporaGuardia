import React from 'react';
import { Card } from '../ui/Card.jsx';

// Daily values based on a 2,000 calorie diet (FDA guidelines)
const DAILY_VALUES = {
	total_fat: 78,
	saturated_fat: 20,
	cholesterol: 300, // mg
	sodium: 2300, // mg
	total_carbohydrates: 275,
	dietary_fiber: 28,
	protein: 50,
	potassium: 4700, // mg
	calcium: 1300, // mg
	iron: 18, // mg
};

export default function RecipeNutritionLabel({ profile }) {
	const calculateDV = (nutrient, amount) => {
		if (!amount || !DAILY_VALUES[nutrient]) return 0;
		return Math.round((amount / DAILY_VALUES[nutrient]) * 100);
	};

	const formatValue = (value, unit) => {
		const num = Number(value);
		if (isNaN(num)) return '';
		return `${num.toFixed(num % 1 === 0 ? 0 : 1)}${unit}`;
	}

	if (!profile || !profile.name) {
		return (
			<Card className="w-full max-w-sm bg-white border-4 border-black p-4 text-center text-gray-500 font-mono">
				Fill out the recipe form to generate the nutrition label.
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-sm bg-white border-4 border-black p-0 font-serif">
			<div className="p-3 space-y-1">
				<h2 className="text-3xl font-black">Nutrition Facts</h2>
				<div className="border-b-2 border-black pb-1">
					<p className="text-sm">{profile.serving_size || '1 serving'}</p>
				</div>
				<div className="border-b-8 border-black py-1">
					<p className="text-sm font-bold">Amount per serving</p>
					<div className="flex justify-between items-baseline">
						<span className="text-xl font-black">Calories</span>
						<span className="text-3xl font-black">{profile.calories || 0}</span>
					</div>
				</div>
				<div className="text-right text-xs font-bold border-b border-black pb-1">% Daily Value*</div>

				<div className="space-y-0.5 text-sm">
					<p><span className="font-bold">Total Fat</span> {formatValue(profile.total_fat, 'g')} <span className="float-right font-bold">{calculateDV('total_fat', profile.total_fat)}%</span></p>
					<p className="pl-4 border-t border-gray-300 pt-0.5"><span >Saturated Fat</span> {formatValue(profile.saturated_fat, 'g')} <span className="float-right font-bold">{calculateDV('saturated_fat', profile.saturated_fat)}%</span></p>
					<p className="pl-4 border-t border-gray-300 pt-0.5"><span><i>Trans</i> Fat</span> {formatValue(profile.trans_fat, 'g')}</p>
					<p className="border-t border-gray-300 pt-0.5"><span className="font-bold">Cholesterol</span> {formatValue(profile.cholesterol, 'mg')} <span className="float-right font-bold">{calculateDV('cholesterol', profile.cholesterol)}%</span></p>
					<p className="border-t border-gray-300 pt-0.5"><span className="font-bold">Sodium</span> {formatValue(profile.sodium, 'mg')} <span className="float-right font-bold">{calculateDV('sodium', profile.sodium)}%</span></p>
					<p className="border-t border-gray-300 pt-0.5"><span className="font-bold">Total Carbohydrate</span> {formatValue(profile.total_carbohydrates, 'g')} <span className="float-right font-bold">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span></p>
					<p className="pl-4 border-t border-gray-300 pt-0.5">Dietary Fiber {formatValue(profile.dietary_fiber, 'g')} <span className="float-right font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span></p>
					<p className="pl-4 border-t border-gray-300 pt-0.5">Total Sugars {formatValue(profile.total_sugars, 'g')}</p>
					<p className="border-t-8 border-black pt-0.5"><span className="font-bold">Protein</span> {formatValue(profile.protein, 'g')}</p>
				</div>

				<div className="border-t-4 border-black pt-1 space-y-0.5 text-sm">
					<p>Potassium {formatValue(profile.potassium, 'mg')} <span className="float-right">{calculateDV('potassium', profile.potassium)}%</span></p>
					<p className="border-t border-gray-300 pt-0.5">Calcium {formatValue(profile.calcium, 'mg')} <span className="float-right">{calculateDV('calcium', profile.calcium)}%</span></p>
					<p className="border-t border-gray-300 pt-0.5">Iron {formatValue(profile.iron, 'mg')} <span className="float-right">{calculateDV('iron', profile.iron)}%</span></p>
				</div>

				<div className="text-xs pt-2 border-t-2 border-black mt-2">
					* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
				</div>
			</div>
		</Card>
	);
}