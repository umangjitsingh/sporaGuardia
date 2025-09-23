import React from 'react';
import { Card } from '../ui/Card.jsx';

const DAILY_VALUES = {
	total_fat: 65,
	saturated_fat: 20,
	cholesterol: 300,
	sodium: 2300,
	total_carbohydrates: 300,
	dietary_fiber: 25,
	protein: 50,
	potassium: 3500,
	calcium: 1000,
	iron: 18
};

export default function NutritionFactsLabel({ profile }) {
	const calculateDV = (nutrient, amount) => {
		if (!amount || !DAILY_VALUES[nutrient]) return 0;
		return Math.round((amount / DAILY_VALUES[nutrient]) * 100);
	};

	const formatValue = (value, unit = 'g') => {
		if (!value && value !== 0) return '0' + unit;
		return value + unit;
	};

	if (!profile) {
		return (
			<Card className="w-full max-w-sm bg-white border-4 border-black p-4">
				<div className="text-center text-gray-500 py-8">
					Enter nutrition data to see the label
				</div>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-sm bg-white border-4 border-black p-0 font-mono">
			{/* Header */}
			<div className="bg-black text-white p-2 text-center">
				<h2 className="text-xl font-bold tracking-wider">Nutrition Facts</h2>
			</div>

			<div className="p-3 space-y-1">
				{/* Serving Size */}
				<div className="border-b-2 border-black pb-2">
					<div className="text-sm">
						<span className="font-bold">Serving Size</span> {profile.serving_size || '1 serving'}
					</div>
				</div>

				{/* Calories */}
				<div className="border-b-8 border-black py-2">
					<div className="flex justify-between items-center">
						<span className="text-xl font-bold">Calories</span>
						<span className="text-xl font-bold">{profile.calories || 0}</span>
					</div>
				</div>

				{/* Daily Value Header */}
				<div className="text-right text-xs font-bold border-b border-black pb-1">
					% Daily Value*
				</div>

				{/* Nutrients */}
				<div className="space-y-1 text-sm">
					{/* Total Fat */}
					<div className="flex justify-between border-b border-gray-400">
						<span><span className="font-bold">Total Fat</span> {formatValue(profile.total_fat)}</span>
						<span className="font-bold">{calculateDV('total_fat', profile.total_fat)}%</span>
					</div>

					{/* Saturated Fat */}
					<div className="flex justify-between border-b border-gray-400 pl-4">
						<span>Saturated Fat {formatValue(profile.saturated_fat)}</span>
						<span className="font-bold">{calculateDV('saturated_fat', profile.saturated_fat)}%</span>
					</div>

					{/* Trans Fat */}
					<div className="border-b border-gray-400 pl-4">
						<span><em>Trans</em> Fat {formatValue(profile.trans_fat)}</span>
					</div>

					{/* Cholesterol */}
					<div className="flex justify-between border-b border-gray-400">
						<span><span className="font-bold">Cholesterol</span> {formatValue(profile.cholesterol, 'mg')}</span>
						<span className="font-bold">{calculateDV('cholesterol', profile.cholesterol)}%</span>
					</div>

					{/* Sodium */}
					<div className="flex justify-between border-b border-gray-400">
						<span><span className="font-bold">Sodium</span> {formatValue(profile.sodium, 'mg')}</span>
						<span className="font-bold">{calculateDV('sodium', profile.sodium)}%</span>
					</div>

					{/* Total Carbohydrates */}
					<div className="flex justify-between border-b border-gray-400">
						<span><span className="font-bold">Total Carbohydrate</span> {formatValue(profile.total_carbohydrates)}</span>
						<span className="font-bold">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span>
					</div>

					{/* Dietary Fiber */}
					<div className="flex justify-between border-b border-gray-400 pl-4">
						<span>Dietary Fiber {formatValue(profile.dietary_fiber)}</span>
						<span className="font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span>
					</div>

					{/* Total Sugars */}
					<div className="border-b border-gray-400 pl-4">
						<span>Total Sugars {formatValue(profile.total_sugars)}</span>
					</div>

					{/* Protein */}
					<div className="border-b-4 border-black pb-2">
						<span><span className="font-bold">Protein</span> {formatValue(profile.protein)}</span>
					</div>

					{/* Additional Nutrients */}
					<div className="space-y-1 pt-2">
						<div className="flex justify-between">
							<span>Potassium {formatValue(profile.potassium, 'mg')}</span>
							<span className="font-bold">{calculateDV('potassium', profile.potassium)}%</span>
						</div>
						<div className="flex justify-between">
							<span>Calcium {formatValue(profile.calcium, 'mg')}</span>
							<span className="font-bold">{calculateDV('calcium', profile.calcium)}%</span>
						</div>
						<div className="flex justify-between border-b-4 border-black pb-2">
							<span>Iron {formatValue(profile.iron, 'mg')}</span>
							<span className="font-bold">{calculateDV('iron', profile.iron)}%</span>
						</div>
					</div>

					{/* Footer */}
					<div className="text-xs pt-2 leading-tight">
						* The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
					</div>
				</div>
			</div>
		</Card>
	);
}