import { useState } from "react";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(null);

  const stories = [
    {
      title: "Amazon SDE Interview Experience",
      detail: "Focused on DSA + System Design questions.",
    },
    {
      title: "Google Internship Experience",
      detail: "Strong problem-solving and coding rounds.",
    },
    {
      title: "Microsoft Placement Experience",
      detail: "Behavioral + technical rounds mix.",
    },
    {
      title: "Flipkart SDE Interview Guide",
      detail: "Emphasis on real-world scenarios.",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-24 px-4 overflow-hidden">

      {/* 🌟 BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* 🔷 LEFT CONTENT */}
        <div className="animate-fadeUp">

          <p className="text-sm text-gray-500 mb-2 tracking-wide">
            ✨ What is X'perienced?
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover <span className="text-green-600">Success Stories</span> 🚀
          </h1>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed max-w-md">
            Learn real interview experiences and prepare smarter for placements with practical insights.
          </p>

          <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
            Dive into Stories →
          </button>

          {/* 🔥 CARD */}
          <div className="mt-10 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-green-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-900">
              Share Your Journey ✍️
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Help others by sharing your real interview experience.
            </p>
          </div>
        </div>

        {/* 🔷 RIGHT SIDE */}
     {/* 🔷 RIGHT SIDE */}
<div className="relative animate-fadeUp">

  {/* 🌑 MAIN DARK CARD */}
  <div className="bg-gradient-to-br from-black via-gray-900 to-black 
                  border border-gray-800 rounded-3xl p-6 shadow-2xl">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <span className="text-green-400 text-sm font-semibold tracking-wide">
        New Stories 📚
      </span>

      <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
        Latest Insights
      </span>
    </div>

    {/* STORIES */}
    <div className="space-y-4">
      {stories.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            setActiveIndex(activeIndex === index ? null : index)
          }
          className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 
          
          ${activeIndex === index 
            ? "bg-gray-800 border border-green-500 shadow-lg shadow-green-500/20 scale-[1.02]" 
            : "bg-gray-900 border border-gray-800 hover:border-gray-600 hover:scale-[1.01]"
          }`}
        >

          {/* 🔥 TOP TEXT */}
          <p className="text-xs text-gray-500">
            {5 + index * 2} mins read • Recently
          </p>

          {/* 🔥 TITLE */}
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm font-semibold text-gray-200">
              {item.title}
            </p>

            <span className="text-green-400 text-lg">
              {activeIndex === index ? "−" : "+"}
            </span>
          </div>

          {/* 🔥 EXPAND CONTENT */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              activeIndex === index ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-400">
              {item.detail}
            </p>
          </div>

        </div>
      ))}
    </div>
  </div>

  {/* 🌟 GLOW EFFECT */}
  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 
                  rounded-3xl blur-xl opacity-10"></div>

</div>

      </div>
    </div>
  );
} 