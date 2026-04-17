import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
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
      const res = await API.post("/auth/register", formData);
      console.log("Signup response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("profile", JSON.stringify(res.data.profile));

      alert("signup succfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl pb-4 font-medium text-center text-black mb-2">
          Welcome
        </h2>

        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          className=" w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 "
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
          className=" w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 "
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg mb-5 transition"
        >
          Signup
        </button>

        <div className="flex justify-center mb-4">
          <hr className="grow border-gray-300" /> <hr />
          <span className="px-3 text-green-500 text-1xl">
            {" "}
            or signup in with
          </span>
          <hr className="grow border-gray-300" />
        </div>

        <div className="flex justify-center flex-row  gap-3 mb-5  ">
          <button
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-8 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
          </button>

          <button
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/github";
            }}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-8 hover:bg-gray-100 transition"
          >
            <FaGithub size={22} />
          </button>

          <button
            onClick={() => {
              window.location.href = "http://localhost:5000/auth/linkedin";
            }}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-8 hover:bg-gray-100 transition"
          >
            <FaLinkedin size={22} className="text-blue-700" />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?
          <Link
            to="/login"
            className="text-yellow-600 font-semibold cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
