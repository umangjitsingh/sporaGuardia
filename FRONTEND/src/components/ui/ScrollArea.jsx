import React from 'react';

const ScrollArea = ({ children, className = "", maxHeight = "60vh" }) => {
	return (
		<div
			className={`overflow-y-auto scrollbar-thin scrollbar-thumb-rounded ${className}`}
			style={{ maxHeight }}
		>
			{children}
		</div>
	);
};

export default ScrollArea;