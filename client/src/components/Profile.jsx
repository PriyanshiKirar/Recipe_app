import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AUth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <Navbar />

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12">
        
        {/* Left Section - User Info & Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-bold text-gray-900">
            Welcome, {user?.username}! 👋
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            Your personalized **culinary journey** starts here!  
            Explore AI-powered recipes, **save your favorite dishes**,  
            and create a **unique food experience** tailored just for you.
          </p>

          <ul className="mt-6 space-y-3 text-gray-800">
            <li className="flex items-center">
              ✅ Discover **AI-Generated Recipes**
            </li>
            <li className="flex items-center">
              ✅ Save & Organize Your Favorite Dishes
            </li>
            <li className="flex items-center">
              ✅ Learn Cooking Tips & Tricks from Experts
            </li>
          </ul>

          <div className="mt-6 flex space-x-4">
            <button onClick={() => navigate("/recipes")} className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-900 transition">
              Explore Recipes 
            </button>
            <button onClick={() => navigate("/saved")} className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition">
              View My Favorites 
            </button>
          </div>
        </div>

        {/* Right Section - High-Quality Dish Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-6">
  <img
    src="https://i.pinimg.com/736x/67/ff/52/67ff52e8bae45561e8148d6a81590705.jpg"
    alt="Delicious Dish"
    className="w-[70%] sm:w-[60%] md:w-[80%] max-w-[320px] rounded-full shadow-xl border-4 border-white"
  />
</div>


      </div>
    </div>
  );
};

export default ProfilePage;
