import React from 'react';
import classNames from 'classnames';

export function Card({ children, className, ...props }) {
	return (
		<div
			className={classNames(
				'bg-white border border-gray-200 rounded-lg shadow-sm',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}