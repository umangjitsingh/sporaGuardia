import React from 'react';

const Checkbox = ({ label, checked, onCheckedChange, className = "", id }) => {
	const checkboxId = id || `checkbox-${label.replace(/\s+/g, '-')}`;

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<input
				type="checkbox"
				id={checkboxId}
				checked={checked}
				onChange={onCheckedChange}
				className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
			/>
			<label htmlFor={checkboxId} className="text-sm text-gray-700">
				{label}
			</label>
		</div>
	);
};

export default Checkbox;