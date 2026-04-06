import { Shield, Eye, Database } from "lucide-react";
import { useEffect, useState } from "react";

export default function InfoSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="relative bg-[#f9fafb] py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          className={`max-w-3xl transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Prepare smarter and crack interviews faster
          </h2>

          <p className="text-gray-500 mt-5 text-base">
            Learn from real interview experiences, understand company patterns,
            and build a preparation strategy that actually works.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield size={20} />,
              title: "Real Interview Experiences",
              desc: "Get insights directly from candidates who cracked top companies like Amazon, Google, and Microsoft.",
            },
            {
              icon: <Eye size={20} />,
              title: "Clear Preparation Strategy",
              desc: "Understand what to focus on — DSA, system design, and HR rounds with real examples.",
            },
            {
              icon: <Database size={20} />,
              title: "Company-wise Insights",
              desc: "Explore interview patterns and frequently asked questions for each company.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="bg-green-600 text-white p-3 rounded-lg w-fit mb-4">
                  {item.icon}
                </div>

                <h3 className="font-semibold text-gray-900 text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
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
