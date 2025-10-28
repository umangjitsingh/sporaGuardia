import mongoose from 'mongoose';

function connectDB(){
	mongoose.connect(process.env.MONGO_DB_URL)
		.then(() => console.log('Connected to MongoDB'))
		.catch((err) => console.error('MongoDB connection error:', err));
}
export default connectDB;