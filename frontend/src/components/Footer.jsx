import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-500">© 2026 X'perienced</p>

        <div className="flex gap-4 text-sm text-gray-500">
          <span className="hover:text-black cursor-pointer">Home</span>
          <span className="hover:text-black cursor-pointer">Explore</span>
          <span className="hover:text-black cursor-pointer">Share</span>
        </div>

        <div className="flex gap-4 text-gray-600">
          <a
            href="https://github.com/anishakatkade/anishakatkade"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/anisha-katkade-003a8625a"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
