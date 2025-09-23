import React from 'react';
import classNames from 'classnames';

export function CardTitle({ children, className, ...props }) {
	return (
		<h3
			className={classNames('text-lg font-semibold text-gray-800', className)}
			{...props}
		>
			{children}
		</h3>
	);
}