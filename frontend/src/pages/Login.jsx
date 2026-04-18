
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful 🚀");

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          Welcome back
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* INPUT */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/10 text-white placeholder-gray-500 rounded-md px-3 py-2.5 focus:outline-none focus:border-white/30 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/10 text-white placeholder-gray-500 rounded-md px-3 py-2.5 focus:outline-none focus:border-white/30 transition"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-medium py-2.5 rounded-md transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "login"}
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
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-white font-medium cursor-pointer ml-1"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
