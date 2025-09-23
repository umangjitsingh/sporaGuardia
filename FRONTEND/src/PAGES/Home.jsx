import React from 'react';


import Button  from '../components/Button.jsx';
import { Beaker, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Home() {
	return (
		<div >
			<section
				className="relative bg-cover bg-center text-gray-800   px-6 bg-[#e8e8e8] py-20 "

			>
				<div className="relative container mx-auto text-center bg-[#dedede] py-26 rounded-lg shadow-md border border-gray-300">
					<div className="scale-90 sm:scale-100">
						<h1 className="text-4xl sm:text-5xl md:6xl font-bold sm:font-extrabold mb-4 leading-tighter font-inter  text-shadow-xs uppercase">
							Advanced Microbial Food Safety Testing
						</h1>
						<p className="text-lg  max-w-3xl mx-auto font-medium text-gray-500">
							Ensuring the safety and quality of your food products with cutting-edge analysis of E. coli, Listeria, and more.
						</p>
						<div className="flex justify-center gap-4  pt-12">
							<Button size="md" className="  flex items-center justify-center  " variant="solid">
								Explore Our Services <ChevronRight className="w-5 h-5 ml-2" />
							</Button>
							<Button size="md" variant="outline" className="bg-transparent text-black border-black ">
								Contact Us
							</Button>
							{/*</Link>*/}
						</div>
					</div>

				</div>
			</section>

			<section className="py-20 bg-[#e8e8e8] scale-90">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold text-gray-700 mb-12 font-pop">Why Choose SporaGuardia?</h2>
					<div className="grid md:grid-cols-3 gap-12">
						<div className="flex flex-col items-center ">
							<div className="bg-gray-100 p-4 rounded-full mb-4 shadow-sm">
								<ShieldCheck className="w-10 h-10 text-gray-600" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Accurate Results</h3>
							<p className="text-gray-600 font-medium">State-of-the-art equipment and validated methods to ensure precision and reliability.</p>
						</div>
						<div className="flex flex-col items-center">
							<div className="bg-gray-100 p-4 rounded-full mb-4 shadow-sm">
								<Beaker className="w-10 h-10 text-gray-600" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Expert Team</h3>
							<p className="text-gray-600 font-medium">Our team of microbiologists and food scientists are leaders in their field.</p>
						</div>
						<div className="flex flex-col items-center">
							<div className="bg-gray-100 p-4 rounded-full mb-4 shadow-sm">
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
							<p className="text-gray-600 font-medium">We understand your need for speed. Get your critical results quickly and efficiently.</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}