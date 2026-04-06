import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white py-24 px-4 overflow-hidden">
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-green-100 rounded-b-full blur-3xl opacity-60"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
          ✨ What's New →
          <span className="text-gray-700">
            Explore latest interview stories
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Crack Your Dream Job with{" "}
          <span className="text-green-600">Real Interview Experiences</span>
        </h1>

        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
          Learn from real candidates and prepare smarter for placements.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/explore")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-2"
          >
            Explore Stories →
          </button>

          <button
            onClick={() => navigate("/share")}
            className="border border-gray-300 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            Share Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}
