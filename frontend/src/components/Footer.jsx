import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t">

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between">

        {/* 🔹 LEFT */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            X'perienced
          </h2>

          <p className="text-white text-sm mt-2">
            © 2026 X'perienced. All rights reserved
          </p>
        </div>

        {/* 🔹 RIGHT SECTIONS */}
        <div className="flex flex-col sm:flex-row gap-10 mt-6 md:mt-0">

          {/* MENU */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">MENU</h3>
            <div className="flex flex-col text-sm text-white">
              <span className="hover:text-gray-500 cursor-pointer">Home</span>
              <span className="hover:text-gray-500 cursor-pointer">Explore</span>
              <span className="hover:text-gray-500 cursor-pointer">Share</span>
            </div>
          </div>



          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">CONTACT</h3>
            <div className="flex flex-col text-sm text-white">
              <span>anishakatkade@gmail.com</span>
              <span>India</span>
            </div>

            {/* ICONS */}
            <div className="flex gap-3 mt-3 text-white">
              <a href="https://github.com/anishakatkade/anishakatkade" target="_blank" rel="noreferrer">
                <Github size={18} className="hover:text-black" />
              </a>
              <a href="https://www.linkedin.com/in/anisha-katkade-003a8625a" target="_blank" rel="noreferrer">
                <Linkedin size={18} className="hover:text-black" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}