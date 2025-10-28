
const isResearcher = (req, res, next) => {
	if (req.user.access_level !== 'researcher') {
		return res.status(403).json({ error: 'Access denied: Researcher only' });
	}
	next();
};
export default isResearcher;