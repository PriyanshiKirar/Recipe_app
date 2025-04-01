import React, { useState } from "react";
import { useAuth } from "../context/AUth";
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
      alert("Please login to save recipes!");
      return;
    }

    try {
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

      if (response.data.success) {
        addRecipe(response.data.recipe);
        navigate("/saved");
        alert("Recipe saved successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error saving recipe:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
        {/* Left Side - Input Form */}
        <div className="w-full md:w-1/2 bg-[#FFF5E1] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#D35400] mb-4">Generate a Recipe</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Ingredients:</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D35400] outline-none"
                placeholder="e.g., tomato, cheese, basil"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Preferences:</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D35400]"
                placeholder="e.g., spicy, vegan"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Cuisine Type:</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D35400]"
                placeholder="e.g., Italian, Indian"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D35400] text-white py-2 px-4 rounded-lg hover:bg-[#A04000] transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </form>
        </div>

        {/* Right Side - Generated Recipe */}
        {recipe && (
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md relative">
            {/* Small Save Button - Right Side */}
            <button
              onClick={handleSaveRecipe}
              className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-md hover:bg-green-700 transition"
            >
              Save
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mt-8">{recipe.title}</h3>
            <p className="mt-2">
              <strong className="text-[#D35400]">Ingredients:</strong>{" "}
              {recipe.ingredients.map((ing) => ing.name || JSON.stringify(ing)).join(", ")}
            </p>
            <p className="mt-2">
              <strong className="text-[#D35400]">Instructions:</strong> {recipe.instructions}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipePage;
