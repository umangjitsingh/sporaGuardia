

import React, { useState } from 'react';
import { Card } from '../ui/Card.jsx';
import  Button  from '../Button.jsx';


// Daily values for different regulations
const DAILY_VALUES = {
	FDA: {
		total_fat: 78,
		saturated_fat: 20,
		cholesterol: 300,
		sodium: 2300,
		total_carbohydrates: 275,
		dietary_fiber: 28,
		protein: 50,
		potassium: 4700,
		calcium: 1300,
		iron: 18,
	},
	CFIA: {
		total_fat: 75,
		saturated_fat: 20,
		cholesterol: 300,
		sodium: 2300,
		total_carbohydrates: 300,
		dietary_fiber: 25,
		protein: 75, // Note: Canada typically doesn't show % DV for protein
		potassium: 3500,
		calcium: 1000,
		iron: 14,
	}
};

const REGULATION_INFO = {
	FDA: {
		title: "Nutrition Facts",
		country: "USA (FDA)",
		footer: "* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
		showProteinDV: true,
	},
	CFIA: {
		title: "Nutrition Facts ",
		country: "Canada (CFIA)",
		footer: "* % Daily Value / % valeur quotidienne",
		showProteinDV: false, // Canadian labels typically don't show % DV for protein
	}
};

export default function RecipeNutritionLabel({ profile }) {
	const [regulation, setRegulation] = useState('CFIA');

	const currentValues = DAILY_VALUES[regulation];
	const currentInfo = REGULATION_INFO[regulation];

	const calculateDV = (nutrient, amount) => {
		if (!amount || !currentValues[nutrient]) return 0;
		return Math.round((amount / currentValues[nutrient]) * 100);
	};

	const formatValue = (value, unit) => {
		const num = Number(value);
		if (isNaN(num)) return `0${unit}`;
		return `${num.toFixed(num % 1 === 0 ? 0 : 1)}${unit}`;
	}

	if (!profile || !profile.name) {
		return (
			<div className="w-full max-w-sm space-y-4">
				<div className="flex gap-2 justify-center">
					<Button
						size="sm"
						variant={regulation === 'CFIA' ? 'solid' : 'outline'}
						onClick={() => setRegulation('CFIA')}

					>
						Canada (CFIA)
					</Button>
					<Button
						size="sm"
						variant={regulation === 'FDA' ? 'solid' : 'outline'}
						onClick={() => setRegulation('FDA')}
					>
						USA (FDA)
					</Button>

				</div>
				<Card className="w-full bg-white border-4 border-black p-4 text-center text-gray-500 font-mono">
					Fill out the recipe form to generate the nutrition label.
				</Card>
			</div>
		);
	}

	return (
		<div className="w-full max-w-sm space-y-4">
			{/* Regulation Switcher */}
			<div className="flex gap-2 justify-center">
				<Button
					size="sm"
					variant={regulation === 'FDA' ? 'solid' : 'ghost'}
					onClick={() => setRegulation('FDA')}
				>
					USA (FDA)
				</Button>
				<Button
					size="sm"
					variant={regulation === 'CFIA' ? 'solid' : 'ghost'}
					onClick={() => setRegulation('CFIA')}
				>
					Canada (CFIA)
				</Button>
			</div>


			{/* Nutrition Label */}
			{regulation === 'CFIA' ? <Card className="w-full bg-white border-4 border-black p-0 font-inter">
				<div className="p-3 space-y-1">
					<p className="text-4xl font-bold leading-6">{currentInfo.title}</p>
               <p className="text-4xl font-bold " >Valeur nutritive</p>
					<div className="border-b-2 border-black pb-1">
						<p className="text-sm font-bold">Per serving / Par portion</p>
						<p className="text-sm">{profile.serving_size || '1 serving'}</p>
					</div>

					<div className="border-b-8 border-black py-1">
						<div className="flex justify-between items-baseline">
							<span className="text-xl font-black">Calories / Calories</span>
							<span className="text-3xl font-black">{profile.calories || 0}</span>
						</div>
					</div>

					<div className="text-right text-xs font-bold border-b border-black pb-1">
						% Daily Value* / % valeur quotidienne*
					</div>

					<div className="space-y-0.5 text-sm">
						{/* Total Fat */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5">
							<span className="font-bold">Fat / Lipides {formatValue(profile.total_fat, 'g')}</span>
							<span className="font-bold">{calculateDV('total_fat', profile.total_fat)}%</span>
						</div>

						{/* Saturated Fat */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5 pl-4">
							<span>Saturated / saturés {formatValue(profile.saturated_fat, 'g')}</span>
							<span className="font-bold">{calculateDV('saturated_fat', profile.saturated_fat)}%</span>
						</div>

						{/* Trans Fat */}
						<div className="border-b border-gray-300 pb-0.5 pl-4">
							<span>+ Trans / trans {formatValue(profile.trans_fat, 'g')}</span>
						</div>

						{/* Cholesterol */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5">
							<span className="font-bold">Cholesterol / Cholestérol {formatValue(profile.cholesterol, 'mg')}</span>
							<span className="font-bold">{calculateDV('cholesterol', profile.cholesterol)}%</span>
						</div>

						{/* Sodium */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5">
							<span className="font-bold">Sodium {formatValue(profile.sodium, 'mg')}</span>
							<span className="font-bold">{calculateDV('sodium', profile.sodium)}%</span>
						</div>

						{/* Carbohydrates */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5">
							<span className="font-bold">Carbohydrate / Glucides {formatValue(profile.total_carbohydrates, 'g')}</span>
							<span className="font-bold">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span>
						</div>

						{/* Dietary Fiber */}
						<div className="flex justify-between border-b border-gray-300 pb-0.5 pl-4">
							<span>Fibre / Fibres {formatValue(profile.dietary_fiber, 'g')}</span>
							<span className="font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span>
						</div>

						{/* Total Sugars */}
						<div className="border-b border-gray-300 pb-0.5 pl-4">
							<span>Sugars / Sucres {formatValue(profile.total_sugars, 'g')}</span>
						</div>

						{/* Protein */}
						<div className={`border-b-4 border-black pb-1 ${currentInfo.showProteinDV ? 'flex justify-between' : ''}`}>
							<span className="font-bold">Protein / Protéines {formatValue(profile.protein, 'g')}</span>
							{currentInfo.showProteinDV && (
								<span className="font-bold">{calculateDV('protein', profile.protein)}%</span>
							)}
						</div>
					</div>

					{/* Additional Nutrients */}
					<div className="border-t-2 border-black pt-1 space-y-0.5 text-sm">
						<div className="flex justify-between">
							<span>Potassium {formatValue(profile.potassium, 'mg')}</span>
							<span>{calculateDV('potassium', profile.potassium)}%</span>
						</div>
						<div className="flex justify-between border-t border-gray-300 pt-0.5">
							<span>Calcium {formatValue(profile.calcium, 'mg')}</span>
							<span>{calculateDV('calcium', profile.calcium)}%</span>
						</div>
						<div className="flex justify-between border-t border-gray-300 pt-0.5">
							<span>Iron / Fer {formatValue(profile.iron, 'mg')}</span>
							<span>{calculateDV('iron', profile.iron)}%</span>
						</div>
					</div>

					{/* Footer */}
					<div className="text-xs pt-2 border-t-2 border-black mt-2 leading-tight">
						{currentInfo.footer}
					</div>
				</div>
			</Card> :
				<Card className="w-full bg-white border-4 border-black p-0 font-serif">
					<div className="p-3 space-y-1">
						<h2 className="text-2xl font-black text-center">{currentInfo.title}</h2>

						<div className="border-b-2 border-black pb-1">
							<p className="text-sm font-bold">Per serving / Par portion</p>
							<p className="text-sm">{profile.serving_size || '1 serving'}</p>
						</div>

						<div className="border-b-8 border-black py-1">
							<div className="flex justify-between items-baseline">
								<span className="text-xl font-black">Calories / Calories</span>
								<span className="text-3xl font-black">{profile.calories || 0}</span>
							</div>
						</div>

						<div className="text-right text-xs font-bold border-b border-black pb-1">
							% Daily Value* / % valeur quotidienne*
						</div>

						<div className="space-y-0.5 text-sm">
							{/* Total Fat */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5">
								<span className="font-bold">Fat / Lipides {formatValue(profile.total_fat, 'g')}</span>
								<span className="font-bold">{calculateDV('total_fat', profile.total_fat)}%</span>
							</div>

							{/* Saturated Fat */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5 pl-4">
								<span>Saturated / saturés {formatValue(profile.saturated_fat, 'g')}</span>
								<span className="font-bold">{calculateDV('saturated_fat', profile.saturated_fat)}%</span>
							</div>

							{/* Trans Fat */}
							<div className="border-b border-gray-300 pb-0.5 pl-4">
								<span>+ Trans / trans {formatValue(profile.trans_fat, 'g')}</span>
							</div>

							{/* Cholesterol */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5">
								<span className="font-bold">Cholesterol / Cholestérol {formatValue(profile.cholesterol, 'mg')}</span>
								<span className="font-bold">{calculateDV('cholesterol', profile.cholesterol)}%</span>
							</div>

							{/* Sodium */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5">
								<span className="font-bold">Sodium {formatValue(profile.sodium, 'mg')}</span>
								<span className="font-bold">{calculateDV('sodium', profile.sodium)}%</span>
							</div>

							{/* Carbohydrates */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5">
								<span className="font-bold">Carbohydrate / Glucides {formatValue(profile.total_carbohydrates, 'g')}</span>
								<span className="font-bold">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span>
							</div>

							{/* Dietary Fiber */}
							<div className="flex justify-between border-b border-gray-300 pb-0.5 pl-4">
								<span>Fibre / Fibres {formatValue(profile.dietary_fiber, 'g')}</span>
								<span className="font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span>
							</div>

							{/* Total Sugars */}
							<div className="border-b border-gray-300 pb-0.5 pl-4">
								<span>Sugars / Sucres {formatValue(profile.total_sugars, 'g')}</span>
							</div>

							{/* Protein */}
							<div className={`border-b-4 border-black pb-1 ${currentInfo.showProteinDV ? 'flex justify-between' : ''}`}>
								<span className="font-bold">Protein / Protéines {formatValue(profile.protein, 'g')}</span>
								{currentInfo.showProteinDV && (
									<span className="font-bold">{calculateDV('protein', profile.protein)}%</span>
								)}
							</div>
						</div>

						{/* Additional Nutrients */}
						<div className="border-t-2 border-black pt-1 space-y-0.5 text-sm">
							<div className="flex justify-between">
								<span>Potassium {formatValue(profile.potassium, 'mg')}</span>
								<span>{calculateDV('potassium', profile.potassium)}%</span>
							</div>
							<div className="flex justify-between border-t border-gray-300 pt-0.5">
								<span>Calcium {formatValue(profile.calcium, 'mg')}</span>
								<span>{calculateDV('calcium', profile.calcium)}%</span>
							</div>
							<div className="flex justify-between border-t border-gray-300 pt-0.5">
								<span>Iron / Fer {formatValue(profile.iron, 'mg')}</span>
								<span>{calculateDV('iron', profile.iron)}%</span>
							</div>
						</div>

						{/* Footer */}
						<div className="text-xs pt-2 border-t-2 border-black mt-2 leading-tight">
							{currentInfo.footer}
						</div>
					</div>
				</Card>}

		</div>
	);
}