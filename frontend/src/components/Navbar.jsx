import { Link, NavLink } from "react-router-dom";
import { Home, Compass, PenSquare, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchUser();
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScroll && window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const menu = "flex items-center gap-1 px-2 py-1 text-sm transition";

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center backdrop-blur-md bg-white/70 ">
        <Link to="/" className="font-semibold text-gray-800">
          X'perienced
        </Link>

        <div className="hidden md:flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <Home size={16} /> Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <Compass size={16} /> Explore
          </NavLink>

          <NavLink
            to="/share"
            className={({ isActive }) =>
              `${menu} ${
                isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <PenSquare size={16} /> Share
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="text-sm text-gray-600">
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="text-sm px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2 cursor-default">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <User size={16} />
              </div>

              <span className="hidden md:block text-sm text-gray-700">
                {user?.name || "User"}
              </span>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/90 px-4 py-3 space-y-3 border-b">
          <NavLink to="/" className="block text-sm">
            Home
          </NavLink>

          <NavLink to="/explore" className="block text-sm">
            Explore
          </NavLink>

          <NavLink to="/share" className="block text-sm">
            Share
          </NavLink>
        </div>
      )}
    </div>
  );
}
