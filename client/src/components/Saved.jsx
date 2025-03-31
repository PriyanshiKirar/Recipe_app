import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AUth";
import axiosInstance from "../config/axiosInstance";


const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/api/recipes/saved", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log(" Fetched Recipes:", response.data);
        if (response.data.success) {
          setRecipes(response.data.recipes || []);
         
        } else {
          setError(response.data.message || "Failed to load recipes.");
        }
      } catch (err) {
        console.error(" Error fetching recipes:", err.message);
        setError("An error occurred while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/recipes/delete/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error(" Error deleting recipe:", response.data.message);
      }
    } catch (err) {
      console.error(" Error deleting recipe:", err.message);
    }
  };

  return (
    <div className="h-screen w-full mt-8 flex flex-col items-center overflow-auto">
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-extrabold text-center text-[#D35400] mb-6">
          Your Saved Recipes
        </h2>

        {loading && (
          <p className="text-gray-500 text-center mt-4">Loading recipes...</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {!loading && !error && recipes.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No recipes saved yet.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 overflow-auto max-h-[70vh] w-full">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="w-96 p-6 border rounded-lg shadow-md bg-[#FFF5E1] hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <h4 className="text-2xl font-semibold text-[#8B4513]">
                  {recipe.title}
                </h4>
                <p className="text-md text-gray-700 mt-2">
                  <strong>Ingredients:</strong>{" "}
                  {recipe.ingredients
                    .slice(0, 3)
                    .map((ing) => ing.item || ing)
                    .join(", ")}
                  {recipe.ingredients.length > 3 && "..."}
                </p>
                <p className="text-md text-gray-700 mt-2">
                  <strong>Instructions:</strong>{" "}
                  {recipe.instructions.slice(0, 40)}
                  {recipe.instructions.length > 40 && "..."}
                </p>
                <button
                  onClick={() =>
                    setExpandedRecipe(
                      expandedRecipe === recipe._id ? null : recipe._id
                    )
                  }
                  className="text-[#D35400] font-semibold mt-2 hover:underline"
                >
                  {expandedRecipe === recipe._id ? "Show Less" : "See More"}
                </button>
                {expandedRecipe === recipe._id && (
                  <div className="mt-2 text-gray-700">
                    <p>
                      <strong>Full Ingredients:</strong>{" "}
                      {recipe.ingredients
                        .map((ing) => ing.item || ing)
                        .join(", ")}
                    </p>
                    <p className="mt-2">
                      <strong>Full Instructions:</strong> {recipe.instructions}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="mt-4 bg-red-500  ml-3 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipesPage;
