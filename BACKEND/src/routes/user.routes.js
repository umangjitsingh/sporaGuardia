import express from 'express';
import User from '../schema/user.js';
import userAuth from '../middlewares/userAuth.js';

const router=express.Router()

router.post('/register', async (req, res) => {
	const { email, password, access_level } = req.body;
	try {
		const user = new User({ email, password, access_level: access_level || 'user' });
		await user.save();
		res.status(201).json({ token: user.getToken() });
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({ error: 'Email already exists' });
		}
		res.status(400).json({ error: err.message });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email:email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}
		const token= await user.getToken();
		res.cookie("token", token)
		return res.status(200).json({
			message: `${user.email}, is logged in successfully.. `,
			success: true,
			user
		})
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get('/me', userAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});


export default router;