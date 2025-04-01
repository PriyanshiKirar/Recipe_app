import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiChevronDown, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // If user is not logged in, don't show navbar
  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-md p-4 fixed w-full top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          Recipe AI
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <button onClick={() => navigate("/profile")} className="hover:text-gray-300">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/recipes")} className="hover:text-gray-300">
             About
            </button>
          </li>
          {/* <li>
            <button onClick={() => navigate("/saved")} className="hover:text-gray-300">
              Saved
            </button>
          </li> */}

          {/* User Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FiUser className="text-white text-xl" />
              <span className="hover:text-gray-300">{user.username}</span>
              <FiChevronDown className="text-sm" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg py-2">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.username}</p>
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-600 py-4 text-center">
          <ul className="space-y-4">
            <li>
              <button onClick={() => navigate("/profile")} className="block w-full hover:text-gray-300">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/recipes")} className="block w-full hover:text-gray-300">
                Recipes
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/saved")} className="block w-full hover:text-gray-300">
                Saved
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="block w-full text-red-400 hover:text-red-500">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
