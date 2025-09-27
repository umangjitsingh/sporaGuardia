// export default async function UploadFile({ file }) {
// 	const formData = new FormData();
// 	formData.append('file', file);
//
// 	try {
// 		const response = await fetch('/api/upload', {
// 			method: 'POST',
// 			body: formData,
// 		});
//
// 		if (!response.ok) {
// 			throw new Error('Upload failed');
// 		}
//
// 		const data = await response.json();
// 		return { file_url: data.url }; // Adjust based on your backend response
// 	} catch (error) {
// 		console.error('Error uploading file:', error);
// 		return { file_url: '' };
// 	}
// }

export default function UploadFile({ file }) {
	return new Promise((resolve) => {
		// Simulate file upload delay
		setTimeout(() => {
			// Create a mock URL for the uploaded file
			const mockUrl = URL.createObjectURL(file);
			resolve({ file_url: mockUrl });
		}, 1000);
	});
}