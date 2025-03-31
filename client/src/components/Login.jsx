import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AUth"; // ✅ Fixed import (was "AUth")

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Ensure login function exists
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending login request:", formData);
      const res = await axios.post("/users/login", formData);

      console.log("Response received:", res?.data); // ✅ Debugging

      if (!res?.data?.user || !res?.data?.token) {
        throw new Error("Invalid login response");
      }

      const { user, token } = res.data;
      login(user, token); // ✅ Ensure login function accepts user & token
      localStorage.setItem("token", token);

      toast.success("Logged in successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF5E1]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-[#D35400] mb-4">
          Welcome Back to Flavor Fusion
        </h2>
        <p className="text-center text-[#5A3E36] mb-6">
          Sign in and continue your culinary journey with AI-powered recipes!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-[#5A3E36]">
          Don't have an account?{" "}
          <span
            className="text-[#D35400] cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
