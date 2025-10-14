import React, { useState, useEffect } from 'react';
import { User } from '../user.js';
import  Button  from '../components/Button.jsx';
import { Beaker, Dna, Lock, FileText, Loader2, AlertTriangle } from 'lucide-react';
import ResearcherZone from './ResearcherZone.jsx';
import { useNavigate } from 'react-router-dom';
import RecipeNutritionLabel from '../components/SERVICES/RecipeNurtitionLabel.jsx';
import fda from "../assets/fda.jpg"



const services = [
	{ title: 'E. coli Testing', description: 'Quantitative and qualitative analysis for E. coli to ensure product safety.', icon: Beaker },
	{ title: 'Listeria Analysis', description: 'Rapid detection and enumeration of Listeria monocytogenes in various food matrices.', icon: Dna },
	{ title: 'Salmonella Screening', description: 'Comprehensive screening for all Salmonella species using PCR and traditional methods.', icon: Beaker },
	{ title: 'Yeast & Mold Count', description: 'Enumeration of yeast and mold to assess shelf-life and product quality.', icon: Dna }
];

export default function Services() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
const navigate=useNavigate()

	 useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = await User.me();
				setUser(currentUser);
			} catch (e) {
				setUser(null);
			}
			setLoading(false);
		};
		checkUser();
	}, []);

	return (
		<div className="container mx-auto px-6 py-12">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800 underline tracking-tight">Our Services</h1>
				<p className="text-lg text-gray-600 mt-2">Comprehensive solutions for food safety and quality assurance.</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8 mb-16 bg-[#dedede] px-8 py-12 rounded-lg shadow-md border border-gray-300">
				{services.map(service => (
					<div key={service.title}>
						<div className="flex flex-row items-center gap-4 ">
							<div className="p-3 bg-gray-100 rounded-lg ">
								<service.icon className="w-6 h-6 text-gray-600" />
							</div>
							<div className="font-semibold">{service.title}</div>
						</div>
						<div>
							<p className="text-gray-600 pt-2 font-medium">{service.description}</p>
						</div>
					</div>
				))}
			</div>

			<div className="bg-gradient-to-r from-[#dedede] to-[#dedede] rounded-lg p-12 shadow-md border border-gray-300">
				<div className="flex items-center sm:gap-24 my-2  pb-8">
					<img className="w-32 h-64" src={fda} alt={""}/>
					<div>
						<h2 className="text-xl font-semibold sm:text-3xl sm:font-bold text-gray-800 tracking-tight ">Recipe Nutrition Facts Tool</h2>
						<p className="text-gray-600 pt-2 font-medium">Built for food creators, trusted by regulators—your go-to tool for nutrition transparency.</p>
					</div>

				</div>
				{loading ? (
					<div className="flex justify-center items-center h-40">
						<Loader2 className="w-8 h-8 animate-spin text-gray-500" />
						<p className="ml-4 text-gray-600">Verifying access...</p>
					</div>
				) : user && user.access_level === 'researcher' ? (

				<Button className="capitalize" onClick={()=>navigate('/services/nft') }>nutrition facts table </Button>

				) : (
					<div className="bg-yellow-50 border-yellow-200 rounded-sm">
						<div className="p-6 text-center">
							<AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-yellow-800">Exclusive Researcher Tool</h3>

							<p className="text-yellow-700 mt-2 mb-4">
								This nutrition calculator is a secure tool available only for our registered research partners.
							</p>
							<Button onClick={() => User.login()} className="bg-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-400  w-48 flex items-center justify-center mx-auto">
								<Lock className="w-4 h-4 mr-2" />
								Login to Access
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
