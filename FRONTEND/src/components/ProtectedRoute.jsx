import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../user.js';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
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

	if (loading) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="w-8 h-8 animate-spin text-gray-500" />
				<p className="ml-4 text-gray-600">Checking access...</p>
			</div>
		);
	}

	if (!user || user.access_level !== 'researcher') {
		return <Navigate to="/services" replace />;
	}

	return children;
}