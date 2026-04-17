import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import API from "../api/axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // 🔹 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.log("User not logged in");
      }
    };

    if (token) fetchUser();
  }, [token]);

  // 🔥 CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpenDropdown(false);
    navigate("/login");
  };

  return (
    <>
      {/* 🔷 LOGO */}
      <div className="fixed top-5 left-6 z-50 text-lg font-semibold text-gray-800">
        X'perienced
      </div>

      {/* 🔷 CENTER NAVBAR */}
      <div className="fixed top-4 left-0 w-full flex justify-center z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-8 px-8 py-3 rounded-full 
        bg-white/80 backdrop-blur-lg shadow-md border border-gray-200">

          <NavLink to="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </NavLink>

          <NavLink to="/explore" className="text-sm text-gray-600 hover:text-black">
            Explore
          </NavLink>

          <NavLink to="/share" className="text-sm text-gray-600 hover:text-black">
            Share
          </NavLink>

        </div>
      </div>

      {/* 🔷 RIGHT SIDE */}
      {!isLoggedIn ? (
        <div className="fixed top-4 right-6 z-50 flex gap-3">
          <NavLink to="/login" className="text-sm text-gray-600 hover:text-black">
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className="text-sm px-4 py-1.5 rounded-full bg-green-500 text-white"
          >
            Sign Up
          </NavLink>
        </div>
      ) : (
        <div ref={dropdownRef} className="fixed top-4 right-6 z-50">

          {/* 🔥 USER BUTTON */}
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center shadow group-hover:scale-105 transition">
              <User size={16} />
            </div>

            <span className="text-sm text-gray-700 font-medium">
              {user?.name || "User"}
            </span>
          </div>

          {/* 🔥 DROPDOWN */}
          {openDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">

              {/* USER NAME */}
              <div className="px-4 py-3 text-sm font-medium text-gray-800 border-b bg-gray-50">
                👤 {user?.name || "User"}
              </div>

              {/* LOGOUT */}
              <div
                onClick={handleLogout}
                className="px-4 py-3 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition"
              >
                🚪 Logout
              </div>

            </div>
          )}
        </div>
      )}

      {/* 🔷 MOBILE */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-1/2 transform -translate-x-1/2 
        w-[90%] bg-white rounded-xl shadow-lg p-4 space-y-3 z-40">

          <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/explore" onClick={() => setMobileOpen(false)}>Explore</NavLink>
          <NavLink to="/share" onClick={() => setMobileOpen(false)}>Share</NavLink>

        </div>
      )}
    </>
  );
}