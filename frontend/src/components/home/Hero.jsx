
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 md:pt-32 overflow-hidden bg-white">

      {/* 🔥 Sticky "What's New" (Navbar ke niche) */}
      {showSticky && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
        >
          <div
            onClick={() => navigate("/explore")}
            className="cursor-pointer inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition"
          >
            ✨ What's New →
            <span className="text-gray-700">
              Explore latest interview stories
            </span>
          </div>
        </motion.div>
      )}

      {/* 🔥 Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-green-200 rounded-full blur-3xl opacity-40"></div>

      {/* 🔥 Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 🔷 Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* ✨ Original Badge */}
        <div
          onClick={() => navigate("/explore")}
          className="cursor-pointer inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm hover:scale-105 transition"
        >
          ✨ What's New →
          <span className="text-gray-700">
            Explore latest interview stories
          </span>
        </div>

        {/* 🔥 HEADING */}
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight leading-[1.1] mx-auto">
          Crack Your Dream Job <br />
          with{" "}
          <span className="text-green-600">
            Real Interview Experiences 🚀
          </span>
        </h1>

        {/* 🔹 Subtext */}
        <p className="text-gray-500 mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Learn from real candidates and prepare smarter for placements.
        </p>

        {/* 🔘 Buttons */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <button
            onClick={() => navigate("/explore")}
            className="bg-green-600 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition shadow-md hover:scale-105"
          >
            Explore Stories →
          </button>

          <button
            onClick={() => navigate("/share")}
            className="border border-gray-300 px-7 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition hover:scale-105"
          >
            Share Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}

