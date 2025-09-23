export default async function UploadFile({ file }) {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Upload failed');
		}

		const data = await response.json();
		return { file_url: data.url }; // Adjust based on your backend response
	} catch (error) {
		console.error('Error uploading file:', error);
		return { file_url: '' };
	}
}