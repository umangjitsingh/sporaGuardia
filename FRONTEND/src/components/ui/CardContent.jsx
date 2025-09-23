import React from 'react';
import classNames from 'classnames';

export function CardContent({ children, className, ...props }) {
	return (
		<div
			className={classNames('p-4', className)}
			{...props}
		>
			{children}
		</div>
	);
}