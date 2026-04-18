
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.log("User fetch error", err);
    }
  };

  if (token) fetchUser();
}, [token]);

  // 🔹 Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpenDropdown(false);
    navigate("/");
  };

  return (
    <>
      {/* 🔷 LOGO */}
      <div className="fixed top-5 left-6 z-50 text-lg font-semibold text-gray-800">
        X'perienced
      </div>

      {/* 🔷 CENTER NAV (ANIMATED) */}
      <div className="fixed top-4 left-0 w-full flex justify-center z-30 pointer-events-none hidden md:flex">
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto flex items-center gap-8 px-8 py-3 rounded-full 
          bg-white/80 backdrop-blur-lg shadow-md border border-gray-200"
        >

          {["/", "/explore", "/share"].map((path, i) => {
            const label = ["Home", "Explore", "Share"][i];

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative text-sm font-medium ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.span whileHover={{ y: -2 }} className="relative">
                    {label}

                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 w-full h-[2px] bg-black rounded"
                      />
                    )}
                  </motion.span>
                )}
              </NavLink>
            );
          })}
        </motion.div>
      </div>

      {/* 🔷 RIGHT SIDE DESKTOP */}
      {!isLoggedIn ? (
        <div className="fixed top-4 right-6 z-50 hidden md:flex gap-4 items-center">
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
        <div ref={dropdownRef} className="fixed top-4 right-6 z-50 hidden md:block">
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
              <User size={16} />
            </div>

            <span className="text-sm text-gray-700 font-medium">
              {user?.name || "User"}
            </span>
          </div>

          {openDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border"
            >
              <div className="px-4 py-3 text-sm border-b">
                👤 {user?.name}
              </div>

              <div
                onClick={handleLogout}
                className="px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 🔷 MOBILE MENU BUTTON */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      {mobileOpen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-40 p-6"
        >
          <div className="flex flex-col gap-4 text-center">

            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/explore" onClick={() => setMobileOpen(false)}>
              Explore
            </NavLink>

            <NavLink to="/share" onClick={() => setMobileOpen(false)}>
              Share
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="border py-2 rounded-lg"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="bg-green-500 text-white py-2 rounded-lg"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 border py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}


