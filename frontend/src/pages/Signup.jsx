
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import API from "../api/axios";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ SUCCESS TOAST
      toast.success("Signup Successful 🎉");

      // 🎉 CONFETTI
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // ⏳ Delay for smooth UX
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      {/* 🔥 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          Create account
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Start sharing your interview experiences 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full bg-transparent border border-white/10 text-white placeholder-gray-500 rounded-md px-3 py-2.5 focus:outline-none focus:border-white/30 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-transparent border border-white/10 text-white placeholder-gray-500 rounded-md px-3 py-2.5 focus:outline-none focus:border-white/30 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-transparent border border-white/10 text-white placeholder-gray-500 rounded-md px-3 py-2.5 focus:outline-none focus:border-white/30 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-medium py-2.5 rounded-md transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-white/10" />
          <span className="px-3 text-gray-500 text-xs">or</span>
          <hr className="flex-1 border-white/10" />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-5">

          <button
            onClick={() => {
              window.location.href =
                "https://xperienced.onrender.com/api/auth/google";
            }}
            className="p-2.5 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            <FcGoogle size={20} />
          </button>

          <button
            onClick={() => {
              window.location.href =
                "https://xperienced.onrender.com/api/auth/github";
            }}
            className="p-2.5 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            <FaGithub size={20} className="text-white" />
          </button>

          <button className="p-2.5 rounded-md bg-white/10 hover:bg-white/20 transition">
            <FaLinkedin size={20} className="text-blue-500" />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-white font-medium cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

