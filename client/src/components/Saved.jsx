import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

        if (response.data.success) {
          setRecipes(response.data.recipes || []);
        } else {
          setError(response.data.message || "Failed to load recipes.");
        }
      } catch (err) {
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
        console.error("Error deleting recipe:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting recipe:", err.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-auto bg-white">
      <Navbar />
      {/* Saved Recipes List */}
      {!expandedRecipe ? (
        <div className="w-full flex flex-col items-center justify-center p-8">
          <h2 className="text-4xl mt-10 font-extrabold text-center text-[#D35400] mb-6">
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
            <div className="flex flex-wrap justify-center gap-6 w-full">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="w-80 md:w-96 p-6 border rounded-lg shadow-md bg-[#FFF5E1] hover:shadow-xl transition-transform transform hover:scale-105 relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <h4 className="text-xl font-semibold text-[#8B4513]">
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
                  <p className="text-md text-gray-700 mt-2 truncate">
                    <strong>Instructions:</strong>{" "}
                    {recipe.instructions.slice(0, 60)}
                    {recipe.instructions.length > 60 && "..."}
                  </p>
                  <button
                    onClick={() => setExpandedRecipe(recipe)}
                    className="text-[#D35400] font-semibold mt-2 hover:underline"
                  >
                    See More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Full Recipe Modal */
        <div className="w-full h-screen flex items-center justify-center p-8">
          <div className="bg-white w-[90%] md:w-[60%] lg:w-[50%] p-6 rounded-lg shadow-lg relative overflow-auto">
            {/* Close Button */}
            <button
              onClick={() => setExpandedRecipe(null)}
              className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>

            <h3 className="text-2xl font-bold text-gray-800">
              {expandedRecipe.title}
            </h3>
            <p className="mt-2 text-gray-700">
              <strong className="text-[#D35400]">Ingredients:</strong>{" "}
              {expandedRecipe.ingredients
                .map((ing) => ing.item || ing)
                .join(", ")}
            </p>
            <div className="relative mt-2 text-gray-700 max-h-60 overflow-auto">
              <p>
                <strong className="text-[#D35400]">Instructions:</strong>{" "}
                {expandedRecipe.instructions}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRecipesPage;
