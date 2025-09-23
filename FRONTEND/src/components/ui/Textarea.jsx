import React from 'react';

export const Textarea = React.forwardRef(({ className = '', rows = 4, ...props }, ref) => (
	<textarea
		ref={ref}
		rows={rows}
		className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full ${className}`}
		{...props}
	/>
));

Textarea.displayName = 'Textarea';