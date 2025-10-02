import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames';

export function SelectTrigger({ className, children, ...props }) {
	return (
		<SelectPrimitive.Trigger
			className={classNames(
				'inline-flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:text-black  focus:outline-none focus:ring-2 focus:ring-zinc-400',
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon>
				<ChevronDown className="w-4 h-4 text-gray-500" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}