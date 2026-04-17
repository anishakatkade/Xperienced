import { Shield, Eye, Database } from "lucide-react";
import { useEffect, useState } from "react";

export default function InfoSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const data = [
    {
      icon: <Shield size={22} />,
      title: "Real Interview Experiences",
      desc: "Get insights directly from candidates who cracked top companies.",
    },
    {
      icon: <Eye size={22} />,
      title: "Clear Preparation Strategy",
      desc: "Understand what to focus on with real examples.",
    },
    {
      icon: <Database size={22} />,
      title: "Company-wise Insights",
      desc: "Explore interview patterns and frequently asked questions.",
    },
  ];

  return (
    <div className="relative bg-white py-32 px-6 overflow-hidden">

      {/* 🌟 FLOATING PARTICLES */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-green-300 rounded-full animate-ping delay-300"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-green-200 rounded-full animate-ping delay-700"></div>

      {/* 🌟 GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-400/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* 🔥 HEADING */}
        <div
          className={`max-w-3xl transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Prepare smarter and crack interviews faster
          </h2>

          <p className="text-gray-500 mt-5 text-base md:text-lg">
            Learn from real experiences and build a strategy that works.
          </p>
        </div>

        {/* 🔥 CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {data.map((item, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="group relative bg-white border border-gray-200 rounded-2xl p-7 
                              hover:-translate-y-3 transition duration-500 overflow-hidden">

                {/* 🌟 HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                bg-gradient-to-r from-green-100 via-transparent to-green-100 
                                transition duration-500"></div>

                {/* 🔥 ICON */}
                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl 
                                bg-green-100 text-green-600 
                                group-hover:bg-green-500 group-hover:text-white 
                                transition duration-300 mb-5">
                  {item.icon}
                </div>

                {/* 🔥 TITLE */}
                <h3 className="relative z-10 font-semibold text-black text-lg">
                  {item.title}
                </h3>

                {/* 🔥 DESC */}
                <p className="relative z-10 text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}