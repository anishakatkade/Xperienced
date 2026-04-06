import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProgressSection() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-green-50 py-20 px-4 text-center">
      <div
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug">
          Stop figuring it out as you go.
          <br />
          <span className="text-green-600">
            Start using systems that scale.
          </span>
        </h2>

        <p className="text-gray-500 mt-4 text-sm md:text-base max-w-xl mx-auto">
          Learn from real interview experiences and focus only on what matters.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => {
              console.log("Go to signup");
              navigate("/share");
            }}
            className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-medium 
            hover:bg-green-600 active:scale-95 transition"
          >
            Get Started Free
          </button>

          <button
            onClick={() => {
              console.log("Go to explore");
              navigate("/explore");
            }}
            className="w-full sm:w-auto text-gray-700 text-sm font-medium hover:text-black"
          >
            Explore stories →
          </button>
        </div>
      </div>
    </div>
  );
}
