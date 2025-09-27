import React, { useState } from 'react';
import { LogIn, LogOut, User, Menu, X } from 'lucide-react';
import logo from '../assets/logon.png';
import { Beaker, Home, Info, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button.jsx';

const navLinks = [
	{ name: 'Home', path: '/', icon: Home },
	{ name: 'About Us', path: '/about', icon: Info },
	{ name: 'Services', path: '/services', icon: Beaker },
	{ name: 'Contact', path: '/contact', icon: Mail },
];

const Header = () => {
	const [user, setUser] = useState({
		full_name: 'harpreet',
		email: 'happy@gmail.com',
	});

	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();

	const handleLogout = () => {
		// Add logout logic here
	};

	return (
		<header className="bg-[#e8e8e8] ">
			<nav className="container mx-auto px-6 py-4 flex justify-between items-center transition-all duration-300">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2">
					<img className="h-14 rounded-lg shadow-sm" src={logo} alt="Logo" />
				</Link>

				{/* Mobile Menu Toggle */}
				<div className="md:hidden">
					<button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
						{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</div>

				{/* Navigation Links */}
				<div className={`md:flex items-center gap-6`}>
					{/* Desktop Links */}
					<div className="hidden md:flex items-center gap-6  ">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								className={`text-black hover:text-gray-700 transition-colors font-semibold text-sm ${
									location.pathname === link.path ? 'text-gray-200 bg-gray-400 py-2 px-3 rounded-xl shadow-sm' : ''
								}`}
							>
								{link.name}
							</Link>
						))}
					</div>

					{/* Mobile Menu */}
					{menuOpen && (
						<div className="flex flex-col md:hidden w-full bg-[#e8e8e8] px-6 py-4 gap-4">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									to={link.path}
									className="text-black hover:text-green-600 font-semibold text-sm"
									onClick={() => setMenuOpen(false)}
								>
									{link.name}
								</Link>
							))}

							<div className="flex items-center gap-4 mt-4">
								{user ? (
									<>
            <span className="text-sm font-medium text-gray-600">
              Welcome, {user.full_name || user.email}
            </span>
										<Button variant="outline" size="sm" onClick={handleLogout} className="flex gap-2">
											<LogOut className="w-4 h-4" />
											Logout
										</Button>
									</>
								) : (
									<Button onClick={() => User.login()} size="sm" className="flex gap-2 bg-blue-600 hover:bg-blue-700">
										<LogIn className="w-4 h-4" />
										Researcher Login
									</Button>
								)}
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
