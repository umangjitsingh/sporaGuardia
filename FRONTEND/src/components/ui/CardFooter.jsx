import React from 'react';
import classNames from 'classnames';

export function CardFooter({ children, className, ...props }) {
	return (
		<div
			className={classNames('px-4 py-2 border-t border-gray-200', className)}
			{...props}
		>
			{children}
		</div>
	);
}