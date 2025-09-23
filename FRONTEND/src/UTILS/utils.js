export const createPageUrl = (pageName) => {
	if (!pageName) return '/';
	const formattedName = pageName.trim().toLowerCase().replace(/\s+/g, '-');
	return `/${formattedName}`;
};