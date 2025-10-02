import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';

export function SelectContent({ className, children, ...props }) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				className={classNames(
					'bg-white border border-gray-300 rounded-md shadow-lg mt-0 z-50',
					className
				)}
				{...props}
			>
				<SelectPrimitive.Viewport className="p-1 ">{children}</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}