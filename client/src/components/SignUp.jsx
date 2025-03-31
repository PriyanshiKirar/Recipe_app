import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("/users/register", formData);
      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
      console.log("Error response:", error.response?.data); // Debugging log

      let errorMessage = "An unknown error occurred";

      if (error.response?.data?.error) {
        if (Array.isArray(error.response.data.error)) {
          errorMessage = error.response.data.error[0]?.msg || errorMessage;
        } else {
          errorMessage = error.response.data.error;
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF5E1]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-[#D35400] mb-4">
          Join Flavor Fusion
        </h2>
        <p className="text-center text-[#5A3E36] mb-6">
          Sign up and start crafting culinary delights with AI-powered recipes!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D35400]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D35400]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D35400]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#D35400] text-white py-2 px-4 rounded-lg hover:bg-[#A04000] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-[#5A3E36]">
          Already have an account?{" "}
          <span
            className="text-[#D35400] cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
