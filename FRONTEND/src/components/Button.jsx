import React from 'react'



const Button = ({ size = "md", variant = "solid", className = "", children }) => {
	const sizeClasses = {
		sm: "px-3 py-1 text-sm",
		md: "sm:px-4 sm:py-2 px-2 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const variantClasses = {
		solid: "bg-gray-800 text-white hover:bg-transparent hover:text-gray-800 hover:border-2 hover:font-semibold",
		outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-800 hover:text-white font-semibold",
		ghost: "bg-transparent text-white hover:bg-white hover:text-black",
	};

	const baseClasses = "rounded transition duration-300 ease-in-out";

	return (
		<button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
			{children}
		</button>
	);
};

export default Button;