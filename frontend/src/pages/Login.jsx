import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 sm:px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-2">
          Welcome Again
        </h2>

        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Welcome back! Sign in to explore and share experiences.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm sm:text-base"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-green-500 text-xs sm:text-sm">
            or sign in with
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center gap-3 mb-5">
          <button
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            className="flex items-center justify-center border border-gray-300 rounded-lg p-2 sm:p-3 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
          </button>

          <button
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/github";
            }}
            className="flex items-center justify-center border border-gray-300 rounded-lg p-2 sm:p-3 hover:bg-gray-100 transition"
          >
            <FaGithub size={20} />
          </button>

          <button className="flex items-center justify-center border border-gray-300 rounded-lg p-2 sm:p-3 hover:bg-gray-100 transition">
            <FaLinkedin size={20} className="text-blue-700" />
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-600 font-semibold cursor-pointer ml-1"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
