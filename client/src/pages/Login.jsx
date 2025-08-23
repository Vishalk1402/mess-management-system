import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

import { loginUser } from "../api/backend"; // ✅ use centralized API

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData); // ✅ centralized API
      const { token, role } = res.data;

      // ✅ Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login Successful ✅", { position: "top-center" });

      setTimeout(() => {
        if (role === "owner") {
          navigate("/Dashboard");
        } else if (role === "student") {
          navigate("/Home");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg, { position: "top-center" });
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-80 md:w-96 space-y-6 border-t-4 border-green-600"
      >
        <div className="text-center">
          <div className="text-4xl text-green-600 mb-2">🥗</div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-sm text-gray-500">Login to your Mess Dashboard</p>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
