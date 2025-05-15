import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axiosInstance.get("/api/recipes/saved", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes(res.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // ✅ Add login function
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    fetchRecipes(); // Fetchs recipes after login
  };

  // ✅ Add logout function
  const logout = () => {
    setUser(null);
    setRecipes([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, recipes, addRecipe: setRecipes }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
