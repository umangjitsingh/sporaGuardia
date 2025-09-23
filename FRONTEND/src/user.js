// src/entities/User.js

export const User = {
	// Simulate fetching the current user
	async me() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const isAuthenticated = true; // Change to false to simulate unauthenticated
				if (isAuthenticated) {
					resolve({
						id: 1,
						name: 'Dr. Jane Doe',
						email: 'jane.doe@example.com',
						access_level: 'researcher', // or 'guest'
					});
				} else {
					reject(new Error('User not authenticated'));
				}
			}, 1000); // Simulate network delay
		});
	},

	// Simulate login action
	login() {
		// Redirect to login page or open modal
		window.location.href = '/login'; // Adjust to your actual login route
	}
};