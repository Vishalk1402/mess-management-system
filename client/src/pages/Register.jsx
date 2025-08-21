import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/backend"; // ✅ use your centralized API helper

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "student", // default role
    messId: "", // only for owner
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData); // ✅ use API function
      alert("🎉 Registration Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "❌ Registration Failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-80 md:w-96 space-y-6 border-t-4 border-blue-600"
      >
        <div className="text-center">
          <div className="text-4xl text-blue-600 mb-2">📝</div>
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500">Register for Smart Mess Access</p>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}         // ✅ controlled input
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}         // ✅ controlled input
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="student">Student</option>
          <option value="owner">Owner</option>
        </select>

        {/* Conditionally show Mess ID input for owners */}
        {formData.role === "owner" && (
          <input
            type="text"
            name="messId"
            placeholder="Enter your Mess ID"
            value={formData.messId}         // ✅ controlled input
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
