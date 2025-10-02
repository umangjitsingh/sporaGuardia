import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

export function SelectValue({ placeholder }) {
	return <SelectPrimitive.Value placeholder={placeholder} />;
}