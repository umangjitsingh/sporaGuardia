import React from 'react';
import {  Outlet } from 'react-router-dom';


import Header from './components/Header.jsx';



export default function Layout() {

	return (
		<div className="min-h-screen flex bg-[#e8e8e8] flex-col  font-inter">
<Header/>
			<main className="flex-grow">
				<Outlet/>
			</main>
			<footer className="bg-black/90 text-white mt-12">
				<div className="container mx-auto px-6 py-8 text-center font-pop">
					<p>&copy; {new Date().getFullYear()} SporaGuardia Inc. All rights reserved.</p>
					<p className="text-sm text-gray-400 mt-2">Pioneering Food Safety Through Science</p>
				</div>
			</footer>
		</div>
	);
}