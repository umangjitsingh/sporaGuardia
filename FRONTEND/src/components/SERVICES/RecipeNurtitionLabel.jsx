import React, { useState } from 'react';
import { Card } from '../ui/Card.jsx';
import Button from '../Button.jsx';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// Daily values for different regulations
const DAILY_VALUES = {
	FDA : {
		total_fat          : 78,
		saturated_fat      : 20,
		cholesterol        : 300,
		sodium             : 2300,
		total_carbohydrates: 275,
		dietary_fiber      : 28,
		added_sugars       : 50,
		protein            : 50,
		potassium          : 4700,
		calcium            : 1300,
		iron               : 18,
		vitamin_d          : 20
	},
	CFIA: {
		total_fat          : 75,
		saturated_fat      : 20,
		cholesterol        : 300,
		sodium             : 2300,
		total_carbohydrates: 300,
		dietary_fiber      : 25,
		protein            : 75, // Note: Canada typically doesn't show % DV for protein
		potassium          : 3500,
		calcium            : 1000,
		iron               : 14,
		vitamin_d          : 20
	}
};

const REGULATION_INFO = {
	FDA : {
		title        : "Nutrition Facts",
		country      : "USA (FDA)",
		footer       : "* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
		showProteinDV: true,
	},
	CFIA: {
		title        : "Nutrition Facts ",
		country      : "Canada (CFIA)",
		showProteinDV: false, // Canadian labels typically don't show % DV for protein
	}
};

export default function RecipeNutritionLabel({ profile }) {
	const [regulation, setRegulation] = useState('CFIA');


	const componentRef = useRef(null);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: 'Nutrition Label',
	});


	const currentValues = DAILY_VALUES[regulation];
	const currentInfo = REGULATION_INFO[regulation];

	const calculateDV = (nutrient, amount) => {
		if (!amount || !currentValues[nutrient]) return 0;
		return Math.round((amount / currentValues[nutrient]) * 100);
	};

	console.log(profile)

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
					variant={regulation === 'FDA' ? 'solid' : 'outline'}
					onClick={() => setRegulation('FDA')}
				>
					USA (FDA)
				</Button>
				<Button
					size="sm"
					variant={regulation === 'CFIA' ? 'solid' : 'outline'}
					onClick={() => setRegulation('CFIA')}
				>
					Canada (CFIA)
				</Button>
			</div>


			{/* Nutrition Label */}



				{profile && profile.name && (
					<div ref={componentRef}>
						{regulation === 'CFIA' ? (
							<Card   className="w-full bg-white  p-0 font-inter">
								<div className="p-3 space-y-1 border-2 border-black">
									<p className="text-4xl font-bold leading-6">{currentInfo.title}</p>
									<p className="text-4xl font-bold ">Valeur nutritive</p>
									<div className="border-b-3 border-black pb-1">
										<p className="text-lg font-semibold tracking-tight ">Per{" "} {profile.serving_size_name || '1 serving'} {"("}{profile.serving_size_value || '400'}{profile.serving_size_unit || 'ml'}{")"}</p>
										<p className="text-lg font-semibold tracking-tight ">pour{" "} {profile.serving_size_name || '1 serving'} {"("}{profile.serving_size_value || '400'}{profile.serving_size_unit || 'ml'}{")"}</p>
									</div>

									<div className="  py-0.5 flex items-center justify-between">
										<div className="flex justify-between items-baseline border-black">
							<span className="text-2xl font-extrabold border-b-8 ">
								  Calories &nbsp; {Math.round(profile.calories || 0)}
								</span>
										</div>
										<div className="text-right text-[13px] font-extrabold  border-black pb-1">
											<p className="leading-2">% Daily Value*</p>
											<p>% valeur quotidienne*</p>
										</div>
									</div>

									<div className=" text-sm ">
										{/* Total Fat */}
										<div className="flex justify-between  ">
											<span className="font-bold text-base">Fat / Lipides {formatValue(profile.total_fat, 'g')}</span>
											<span className="font-bold">{calculateDV('total_fat', profile.total_fat)}%</span>
										</div>

										{/* Saturated Fat */}
										<div className="flex justify-between  pl-4 ">
											<span className="font-medium text-[15px] ">Saturated / saturés {formatValue(profile.saturated_fat, 'g')}</span>
											<span className="font-bold">{calculateDV('saturated_fat', profile.saturated_fat)}%</span>
										</div>

										{/* Trans Fat */}
										<div className="border-b-2 border-gray-500  pb-1 pl-4 ">
											<span className="font-medium text-[15px] ">+ Trans / trans {formatValue(profile.trans_fat, 'g')}</span>
										</div>

										{/* Carbohydrates */}
										<div className="flex justify-between  pb-0.5 pt-1">
											<span className="font-bold text-base">Carbohydrate / Glucides {formatValue(profile.total_carbohydrates, 'g')}</span>
											<span className="font-bold">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span>
										</div>

										{/* Dietary Fiber */}
										<div className="flex justify-between  pb-0.5 pl-4">
											<span className="font-medium text-[15px]">Fibre / Fibres {formatValue(profile.dietary_fiber, 'g')}</span>
											<span className="font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span>
										</div>

										{/* Total Sugars */}
										<div className=" border-b-2 border-gray-500 pb-1 pl-4">
											<span className="font-medium text-[15px]">Sugars / Sucres {formatValue(profile.total_sugars, 'g')}</span>
										</div>

										{/* Protein */}
										<div className={`border-b-2 border-gray-500 pb-0.5 pt-0.5${currentInfo.showProteinDV ? 'flex justify-between' : ''}`}>
											<span className="font-bold text-base">Protein / Protéines {formatValue(profile.protein, 'g')}</span>
											{currentInfo.showProteinDV && (
												<span className="font-bold">{calculateDV('protein', profile.protein)}%</span>
											)}
										</div>

										{/* Cholesterol */}
										<div className="flex justify-between border-b-2 border-gray-500 pb-0.5 pt-0.5">
											<span className="font-bold text-base">Cholesterol / Cholestérol {formatValue(profile.cholesterol, 'mg')}</span>
											<span className="font-bold">{calculateDV('cholesterol', profile.cholesterol)}%</span>
										</div>

										{/* Sodium */}
										<div className="flex justify-between border-b-8 border-black pb-0.5 pt-0.5">
											<span className="font-bold text-base">Sodium {formatValue(profile.sodium, 'mg')}</span>
											<span className="font-bold">{calculateDV('sodium', profile.sodium)}%</span>
										</div>


									</div>

									{/* Additional Nutrients */}
									<div className=" pt-1 space-y-0.5 text-sm">
										<div className="flex justify-between">
											<span className="text-[15px] font-medium">Potassium {formatValue(profile.potassium, 'mg')}</span>
											<span>{calculateDV('potassium', profile.potassium)}%</span>
										</div>
										<div className="flex justify-between border-t-2 border-gray-500 pt-0.5">
											<span className="text-[15px] font-medium">Calcium {formatValue(profile.calcium, 'mg')}</span>
											<span>{calculateDV('calcium', profile.calcium)}%</span>
										</div>
										<div className="flex justify-between border-t-2 border-gray-500 pt-0.5">
											<span className="text-[15px] font-medium">Iron / Fer {formatValue(profile.iron, 'mg')}</span>
											<span>{calculateDV('iron', profile.iron)}%</span>
										</div>
									</div>

									{/* Footer */}
									<div className="text-xs pt-2 border-t-8 border-black mt-2 leading-tight">
										<p>*5% or less is <strong className="font-extrabold">a little</strong>,15% or more
											is <strong className="font-extrabold">a lot</strong> .</p>
										<p>*5 % ou moins, c’est <strong className="font-extrabold">peu</strong> ; 15 % ou plus,
											c’est <strong className="font-extrabold">beaucoup</strong></p>

									</div>
								</div>
							</Card>
						) : (
							<Card className="w-full bg-white border-black p-0 font-inter scale-90">
								<div className="p-3 space-y-1 border-8 ">
									<h2 className="text-5xl font-black text-center border-b leading-12 tracking-tight">{currentInfo.title}</h2>
									<div className="border-b-[1.2rem] border-black pb-1">
										<p className="text-2xl font-medium tracking-tighter">
											{Math.round(profile.total_weight / profile.serving_size_value)} Servings per {profile.container_name}
										</p>
										<div className="flex justify-between leading-5 pb-1">
											<span className="text-2xl font-black tracking-tighter">Serving size</span>
											<span className="text-2xl font-black tracking-tighter">
      {profile.serving_size_name} ({profile.serving_size_value || '400'}{profile.serving_size_unit || 'ml'})
    </span>
										</div>
									</div>

									<div className="border-b-8 border-black py-1">
										<div>
											<p className="tracking-tight font-extrabold text-lg leading-2">Amount per serving</p>
										</div>
										<div className="flex justify-between items-baseline">
											<span className="text-4xl font-black tracking-tighter">Calories</span>
											<span className="text-5xl font-black">{Math.round(profile.calories || 0)}</span>
										</div>
									</div>

									<div className="text-right text-base font-black border-b-2 border-black/60 pb-1">
										% Daily Value*
									</div>

									<div className="space-y-0.5 text-lg">
										{/* Total Fat */}
										<div className="flex justify-between border-b border-black pb-0.5 tracking-tight">
											<span className="font-black">Total Fat <span className="font-medium">{formatValue(profile.total_fat, 'g')}</span></span>
											<span className="font-black">{calculateDV('total_fat', profile.total_fat)}%</span>
										</div>

										{/* Saturated Fat */}
										<div className="flex justify-between border-b border-black pb-0.5 pl-4 tracking-tight">
											<span>Saturated Fat {formatValue(profile.saturated_fat, 'g')}</span>
											<span className="font-black">{calculateDV('saturated_fat', profile.saturated_fat)}%</span>
										</div>

										{/* Trans Fat */}
										<div className="border-b border-black pb-0.5 pl-4 tracking-tight">
											<span>+ Trans Fat {formatValue(profile.trans_fat, 'g')}</span>
										</div>

										{/* Cholesterol */}
										<div className="flex justify-between border-b border-black pb-0.5 tracking-tight">
											<span className="font-black">Cholesterol <span className="font-normal">{formatValue(profile.cholesterol, 'mg')}</span></span>
											<span className="font-black">{calculateDV('cholesterol', profile.cholesterol)}%</span>
										</div>

										{/* Sodium */}
										<div className="flex justify-between border-b border-black pb-0.5 tracking-tight">
											<span className="font-black">Sodium <span className="font-normal">{formatValue(profile.sodium, 'mg')}</span></span>
											<span className="font-black">{calculateDV('sodium', profile.sodium)}%</span>
										</div>

										{/* Carbohydrates */}
										<div className="flex justify-between border-b border-black pb-0.5 tracking-tight">
											<span className="font-black">Total Carbohydrate  <span className="font-normal">{formatValue(profile.total_carbohydrates, 'g')}</span></span>
											<span className="font-black">{calculateDV('total_carbohydrates', profile.total_carbohydrates)}%</span>
										</div>

										{/* Dietary Fiber */}
										<div className="flex justify-between border-b border-black pb-0.5 pl-4 tracking-tight">
											<span>Dietary Fibre {formatValue(profile.dietary_fiber, 'g')}</span>
											<span className="font-bold">{calculateDV('dietary_fiber', profile.dietary_fiber)}%</span>
										</div>

										{/* Total Sugars */}
										<div className=" pb-0.5 pl-4 tracking-tight">
											<span>Total Sugars {formatValue(profile.total_sugars, 'g')}</span>
										</div>

										<div className=" pb-0.5 ml-12 border-t border-black tracking-tight flex justify-between">
											<span>Includes {formatValue(profile.added_sugars, 'g')} Added Sugars</span>
											<span className="font-black">{calculateDV('added_sugars', profile.added_sugars)}%</span>
										</div>


										{/* Protein */}
										<div className={`border-b-[1.2rem] border-t border-black  tracking-tight ${currentInfo.showProteinDV ? 'flex justify-between' : ''}`}>
											<span className="font-black">Protein <span className="font-normal">{formatValue(profile.protein, 'g')}</span></span>

										</div>
									</div>

									{/* Additional Nutrients */}
									<div >

										<div className="flex justify-between  ">
											<span className="font-medium ">Vitamin D {formatValue(profile.vitamin_d, 'mcg')}</span>
											<span>{calculateDV('vitamin_d', profile.vitamin_d)}%</span>
										</div>

										<div className="flex justify-between border-t border-b border-black pt-0.5">
											<span className="font-medium ">Calcium {formatValue(profile.calcium, 'mg')}</span>
											<span>{calculateDV('calcium', profile.calcium)}%</span>
										</div>
										<div className="flex justify-between border-b border-black pb-0.5  tracking-tight">
											<span>Iron / Fer {formatValue(profile.iron, 'mg')}</span>
											<span>{calculateDV('iron', profile.iron)}%</span>
										</div>

										<div className="flex justify-between border-b-8 border-black pb-0.5  tracking-tight">
											<span className="font-medium ">Potassium {formatValue(profile.potassium, 'mg')}</span>
											<span>{calculateDV('potassium', profile.potassium)}%</span>
										</div>


									</div>

									{/* Footer */}
									<div className="text-sm font-medium tracking-tighter">
										{currentInfo.footer}
									</div>
								</div>
							</Card>
						)}
					</div>
				)}



				<Button onClick={handlePrint}>Print or Save PDF</Button>




		</div>
	);
}