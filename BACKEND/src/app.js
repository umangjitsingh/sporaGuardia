
import express from 'express';
import connectDB from './DB.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import recipeRouter from './routes/recipe.routes.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
			origin     : "http://localhost:5173",
			credentials: true
		}
	)
)

app.use('/auth',userRouter)
app.use('/recipes',recipeRouter)




// Optional: Seed prebuilt recipes (run once manually if needed)
// async function seedRecipes(userId) {
//   const prebuilt = [
//     // Add your prebuilt recipes here, e.g.
//     { name: 'Example Recipe 1', serving_size: '100g', calories: 200, /* other fields */ created_by: userId },
//     // ...
//   ];
//   await Recipe.insertMany(prebuilt);
// }
// // Call seedRecipes('someUserId') after creating a user.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));