
import mongoose from 'mongoose';


const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	serving_size: { type: String },
	calories: { type: Number },
	total_fat: { type: Number },
	saturated_fat: { type: Number },
	trans_fat: { type: Number },
	cholesterol: { type: Number },
	sodium: { type: Number },
	total_carbohydrates: { type: Number },
	dietary_fiber: { type: Number },
	total_sugars: { type: Number },
	protein: { type: Number },
	potassium: { type: Number },
	calcium: { type: Number },
	iron: { type: Number },
	created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date },
	isPrebuild:{type:Boolean,required:true,default:false}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
