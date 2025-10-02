import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check } from 'lucide-react';
import classNames from 'classnames';

export function SelectItem({ value, children, className, ...props }) {
	return (
		<SelectPrimitive.Item
			value={value}
			className={classNames(
				'flex items-center justify-between px-3 py-2 text-sm text-gray-700  hover:bg-zinc-400 rounded cursor-pointer',
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator>
				<Check className="w-4 h-4 text-zinc-900" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}