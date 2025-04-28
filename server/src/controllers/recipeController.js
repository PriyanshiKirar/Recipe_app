import Recipe from "../models/recipeModel.js";
import { generateRecipe } from "../services/geminiService.js";
export const generateRecipeHandler = async (req, res, next) => {
  try {
    const { ingredients, preferences, cuisine } = req.body;
    // console.log(" Request Body:", req.body);

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ingredients must be a non-empty array.",
      });
    }

    const recipe = await generateRecipe(ingredients, preferences, cuisine);
    if (!recipe) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to generate recipe." });
    }

    return res.json({ success: true, recipe });
  } catch (err) {
    console.error(" Error in generateRecipeHandler:", err.message);
    next(err);
  }
};

//  Save Recipe (Protected)
export const saveRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, source, originalQuery } =
      req.body;
    const userId = req.user._id;
    console.log(userId, "user");

    // Check if recipe already exists for the user
    const existingRecipe = await Recipe.findOne({ userId, title }).lean();
    if (existingRecipe) {
      return res
        .status(400)
        .json({ success: false, message: "Recipe already saved." });
    }

    const newRecipe = new Recipe({
      userId,
      title,
      ingredients,
      instructions,
      source,
      originalQuery,
    });
    await newRecipe.save();

    return res.status(201).json({
      success: true,
      message: "Recipe saved successfully.",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error(" Error in saveRecipe:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to save recipe.",
      error: err.message,
    });
  }
};

export const getSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id }).lean();
    return res.json({ success: true, recipes });
  } catch (err) {
    console.error(" Error in getSavedRecipes:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes.",
      error: err.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found or unauthorized." });
    }

    return res.json({ success: true, message: "Recipe deleted successfully." });
  } catch (err) {
    console.error(" Error in deleteRecipe:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete recipe.",
      error: err.message,
    });
  }
};
