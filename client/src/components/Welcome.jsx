import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center h-auto md:h-screen px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-0 bg-gradient-to-br from-green-100 to-green-300">
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-green-800 leading-tight">
          Generate Delicious Recipes Instantly
        </h1>
        <p className="text-zinc-600 mt-4 sm:mt-5 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl">
          Discover unique and tasty recipes with just one click. Enter your
          favorite ingredients and let us do the magic!
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-lg font-semibold hover:bg-green-800 duration-200 rounded-lg shadow-lg"
        >
          Generate Recipe &nbsp; &#8594;
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mt-6 sm:mt-8 md:mt-0 relative">
        <img
          className="w-[90%] sm:w-[80%] md:w-full max-w-xs sm:max-w-sm md:max-w-lg drop-shadow-lg rounded-xl"
          src="https://www.pngall.com/wp-content/uploads/8/Cooking-Recipe-PNG-Clipart.png"
          alt="Cooking Recipe"
        />
        <div className="absolute top-4 sm:top-10 left-3 sm:left-5 bg-white p-2 sm:p-4 rounded-lg shadow-md hidden sm:block">
          <p className="text-green-700 font-semibold text-xs sm:text-sm">
            Fresh & Healthy
          </p>
        </div>
        <div className="absolute bottom-4 sm:bottom-10 right-3 sm:right-5 bg-white p-2 sm:p-4 rounded-lg shadow-md hidden sm:block">
          <p className="text-green-700 font-semibold text-xs sm:text-sm">
            Easy & Quick
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
