import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// import { User } from '@/entities/User';
import Button  from './components/Button.jsx';
import {  Beaker, Home, Info, Mail, LogIn, LogOut } from 'lucide-react';

import Header from './components/Header.jsx';



export default function Layout() {
	const [user, setUser] = useState(null);
	const location = useLocation();

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			const currentUser = await User.me();
	// 			setUser(currentUser);
	// 		} catch (error) {
	// 			setUser(null);
	// 		}
	// 	};
	// 	fetchUser();
	// }, [location.pathname]);

	// const handleLogout = async () => {
	// 	await User.logout();
	// 	setUser(null);
	// 	window.location.reload();
	// };

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