
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	access_level: { type: String, enum: ['guest', 'researcher'], default: 'guest' },
});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = function () {
	return jwt.sign(
		{ id: this._id, access_level: this.access_level },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);
};

const User = mongoose.model('User', userSchema);
export default User;