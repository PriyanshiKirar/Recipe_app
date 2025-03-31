import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
    },
    title: {
        type: String,
        required: [true, "Recipe title is required"],
    },
    ingredients: [String], 
    instructions: {
        type: [String], // Array of instruction steps
        required: [true, "Instructions are required"],
    },
    source: {
        type: String,
        default: "gemini", // Default source is "gemini"
    },
    originalQuery: {
        type: Object, // Original user query should be an object
    },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
