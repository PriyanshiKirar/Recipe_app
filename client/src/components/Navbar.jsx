import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  //  Agar user login nahi hai, toh navbar render hi mat karo
  if (!user) return null;

  return (
    <nav className="bg-[#D35400] text-white bg-opacity-90 shadow-md p-4 fixed w-full top-0 z-50 flex justify-between items-center">
      <h1 className="text-2xl font-bold ">Recipe AI</h1>
      <ul className="flex space-x-6 items-center">
        {/*  Home button jo profile page pe navigate karega */}
        <li>
          <button
            onClick={() => navigate("/profile")}
            className=" hover:text-gray-900"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/recipes")}
            className="  hover:text-gray-900"
          >
            Recipes
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/saved")}
            className="  hover:text-gray-900"
          >
            Saved
          </button>
        </li>

        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FiUser className="text-gray-700 text-xl" />
            <span className="text-gray-700 hover:text-gray-900">
              {user.username}
            </span>
            <FiChevronDown className="text-gray-700 text-sm" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transition-all duration-300">
              <div className="px-4 py-2 border-b">
                <p className="text-gray-700 font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
