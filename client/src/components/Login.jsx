import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth"; // ✅ Fixed import

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/users/login", formData);

      if (!res?.data?.user || !res?.data?.token) {
        throw new Error("Invalid login response");
      }

      const { user, token } = res.data;
      login(user, token);
      localStorage.setItem("token", token);

      toast.success("Logged in successfully");
      navigate("/profile");
    } catch (error) {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in and continue your culinary journey.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-shadow shadow-md"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-green-700 cursor-pointer underline"
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
