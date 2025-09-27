import React from 'react';

const variantStyles = {
	success: 'bg-green-100 text-green-800 border-green-300',
	error: 'bg-red-100 text-red-800 border-red-300',
	warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
	info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export const Alert = ({ variant = 'info', className = '', children }) => {
	const styles = variantStyles[variant] || variantStyles.info;

	return (
		<div className={`border rounded-md p-4 ${styles} ${className}`}>
			{children}
		</div>
	);
};

export const AlertDescription = ({ children }) => (
	<p className="text-sm mt-1">
		{children}
	</p>
);