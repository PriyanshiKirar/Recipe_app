import React, { useState } from "react";
import { useAuth } from "../context/AUth"; // ✅ Import AuthContext
import axiosInstance from "../config/axiosInstance";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const RecipePage = () => {
  const [ingredients, setIngredients] = useState("");
  const [preferences, setPreferences] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, addRecipe } = useAuth(); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/recipes/generate",
        {
          ingredients: ingredients.split(",").map((item) => item.trim()),
          preferences,
          cuisine,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        setRecipe(response.data.recipe);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("Please login to save recipes!");4
      return;
    }
  
    // const filteredIngredients = recipe.ingredients.filter(
    //   (ing) => ing.item && ing.quantity
    // );
  
    // if (filteredIngredients.length !== recipe.ingredients.length) {
    //   alert("Please fill all ingredient fields properly!");
    //   return;
    // }
  
    try {
      console.log(" Sending data:", {
        title: recipe.title,
        ingredients,
        instructions: recipe.instructions,
        source: recipe.source || "gemini", 
        originalQuery: recipe.originalQuery || {}, 
      });
  
      const response = await axiosInstance.post(
        "/api/recipes/save",
        {
          title: recipe.title,
          ingredients,
          instructions: recipe.instructions,
          source: recipe.source || "gemini", 
          originalQuery: recipe.originalQuery || {}, 
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
  
      console.log(" Response received:", response.data);
  
      if (response.data.success) {
        addRecipe(response.data.recipe);
        navigate("/saved")
        alert("Recipe saved successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(" Error saving recipe:", error.message);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-20 flex gap-6 ">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate a Recipe</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Ingredients (comma-separated):</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="e.g., tomato, cheese, basil"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Preferences:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="e.g., spicy, vegan"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Cuisine Type:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="e.g., Italian, Indian"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#D35400] text-white px-4 py-2 rounded-lg hover:bg-[#A04000] w-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </form>
        </div>

        {recipe && (
          <div className="w-1/2 p-4 border rounded bg-gray-50 ">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.map((ing) => ing.name || JSON.stringify(ing)).join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button
              onClick={handleSaveRecipe}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
            >
              Save Recipe
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipePage;
