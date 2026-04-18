import Login from "./pages/Login.jsx";
import { useEffect } from "react";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateExperience from "./pages/CreateExperience.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import { Toaster } from "react-hot-toast";
import API from "./api/axios";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // ✅ ADD

import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer.jsx";
import PostDetail from "./pages/PostDetail";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  const hideFooter = ["/login", "/signup"].includes(location.pathname);


  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

   
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      API.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log("USER:", res.data);
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
    }

  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {!hideNavbar && <Navbar />}

      {/* ✅ ANIMATION WRAPPER */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Home />} />
          <Route path="/share" element={<CreateExperience />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/experience/:id" element={<SinglePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </AnimatePresence>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
