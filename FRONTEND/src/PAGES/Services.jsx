import React, { useState, useEffect } from 'react';
import { User } from '../user.js';
import  Button  from '../components/Button.jsx';
import { Beaker, Dna, Lock, FileText, Loader2, AlertTriangle } from 'lucide-react';
import ResearcherZone from '../components/SERVICES/ResearcherZone.jsx';
// import { Card } from '../components/ui/Card.jsx';
// import { CardHeader } from '../components/ui/CardHeader.jsx';
// import { CardTitle } from '../components/ui/CardTitle.jsx';
// import { CardContent } from '../components/ui/CardContent.jsx';

const services = [
	{ title: 'E. coli Testing', description: 'Quantitative and qualitative analysis for E. coli to ensure product safety.', icon: Beaker },
	{ title: 'Listeria Analysis', description: 'Rapid detection and enumeration of Listeria monocytogenes in various food matrices.', icon: Dna },
	{ title: 'Salmonella Screening', description: 'Comprehensive screening for all Salmonella species using PCR and traditional methods.', icon: Beaker },
	{ title: 'Yeast & Mold Count', description: 'Enumeration of yeast and mold to assess shelf-life and product quality.', icon: Dna }
];

export default function Services() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

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

			<div className="bg-gradient-to-r from-[#bdc3c7] to-[#f2f2f2] rounded-lg p-12 ">
				<div className="flex items-center gap-2 sm:gap-4 mb-4 mt-6 pl-20 pb-12">
					<FileText className="h-5 w-5 sm:w-8 sm:h-8 text-zinc-700" />
					<h2 className="text-xl font-semibold sm:text-3xl sm:font-bold text-gray-700 tracking-tight ">Recipe Nutrition Calculator</h2>
				</div>
				{loading ? (
					<div className="flex justify-center items-center h-40">
						<Loader2 className="w-8 h-8 animate-spin text-gray-500" />
						<p className="ml-4 text-gray-600">Verifying access...</p>
					</div>
				) : user && user.access_level === 'researcher' ? (
					<ResearcherZone user={user} />

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
// export default function ServicesPage() {
// 	return (
// 		<div className="container mx-auto px-6 py-12">
// 			<div className="text-center mb-12">
// 				<h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
// 				<p className="text-lg text-gray-600 mt-2">Comprehensive solutions for food safety and quality assurance.</p>
// 			</div>
//
// 			<div className="grid md:grid-cols-2 gap-8 mb-16">
// 				{services.map(service => (
// 					<Card key={service.title}>
// 						<CardHeader className="flex flex-row items-center gap-4">
// 							<div className="p-3 bg-blue-100 rounded-lg">
// 								<service.icon className="w-6 h-6 text-blue-600" />
// 							</div>
// 							<CardTitle>{service.title}</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<p className="text-gray-600">{service.description}</p>
// 						</CardContent>
// 					</Card>
// 				))}
// 			</div>
//
// 			<div className="bg-gray-100 rounded-lg p-8">
// 				<div className="flex items-center gap-4 mb-4">
// 					<FileText className="w-8 h-8 text-green-600" />
// 					<h2 className="text-3xl font-bold text-gray-800">Recipe Nutrition Calculator</h2>
// 				</div>
// 				<p className="text-gray-600 mb-6">Use our free tool to calculate nutrition facts for your recipes, create new mixes, and save them for public reference.</p>
// 				<ResearcherZone />
// 			</div>
// 		</div>
// 	);
// }