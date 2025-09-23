import React from 'react';

export const Input = React.forwardRef(({ type = 'text', className = '', ...props }, ref) => (
	<input
		type={type}
		ref={ref}
		className={`border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full ${className}`}
		{...props}
	/>
));

Input.displayName = 'Input';