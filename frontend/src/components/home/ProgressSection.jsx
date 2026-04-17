import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProgressSection() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="relative bg-black py-32 px-6 overflow-hidden">

      {/* 🌐 LIGHT GRID */}
      <div className="absolute inset-0 opacity-[0.04]
        bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
        bg-[size:80px_80px]">
      </div>

      {/* 🌟 GREEN GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 blur-3xl rounded-full"></div>

      {/* 🔥 CONTENT */}
      <div
        className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        {/* 🔥 HEADING */}
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Enhance Your <span className="text-green-500">Professional</span>
          <br />
          Journey Today
        </h2>

        {/* 🔥 SUBTEXT */}
        <p className="text-gray-400 mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Improve your skills with real experiences and structured learning.
        </p>

        {/* 🔥 BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5">

          {/* PRIMARY */}
          <button
            onClick={() => navigate("/share")}
            className="px-10 py-3 rounded-full text-white text-sm font-medium 
            bg-green-500 hover:bg-green-600 
            shadow-md hover:shadow-green-500/40 
            hover:scale-105 transition"
          >
            Get Started →
          </button>

          {/* SECONDARY */}
          <button
            onClick={() => navigate("/explore")}
            className="px-8 py-3 rounded-full text-sm font-medium 
            text-gray-300 border border-gray-700 
            hover:border-green-500 hover:text-green-400 
            transition"
          >
            Explore Stories
          </button>

        </div>

      </div>
    </div>
  );
}