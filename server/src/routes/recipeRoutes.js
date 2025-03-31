import express from "express";
import { authUser } from "../middlewares/userMiddleware.js";
import { generateRecipeHandler, saveRecipe, getSavedRecipes, deleteRecipe } from "../controllers/recipeController.js";

const router = express.Router();

router.post("/generate", authUser, generateRecipeHandler);
router.post("/save", authUser, saveRecipe);
router.get("/saved", authUser, getSavedRecipes);
router.delete("/delete/:id", authUser, deleteRecipe);

export default router;
