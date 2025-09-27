import React from 'react';

// Main Dialog wrapper
const Dialog = ({ open,  children }) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50  ">
			<div className="bg-white rounded-lg shadow-lg sm:max-w-6xl ">
				{children}
			</div>
		</div>
	);
};

// Header section
const DialogHeader = ({ children }) => (
	<div className="px-6 py-4 border-b border-gray-200">
		{children}
	</div>
);

// Title text
const DialogTitle = ({ children }) => (
	<h2 className="text-xl font-semibold text-gray-800">
		{children}
	</h2>
);

// Description text
const DialogDescription = ({ children }) => (
	<p className="mt-2 text-sm text-gray-600">
		{children}
	</p>
);

// Main content area
const DialogContent = ({ children }) => (
	<div className="px-6 py-4">
		{children}
	</div>
);

// Footer with actions
const DialogFooter = ({ children }) => (
	<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
		{children}
	</div>
);

// Export all components from one file
export {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
};