import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateExperience from "./pages/CreateExperience.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer.jsx";
import PostDetail from "./pages/PostDetail";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  const hideFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
        <Route path="/share" element={<CreateExperience />} />
        <Route path="/explore" element={<Explore />} />
      
        <Route path="/experience/:id" element={<SinglePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>

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
