import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Fees from "../modules/Students/Fees";  
import Admission from "../modules/Students/Admission";
import Teachers from "../pages/Teachers";
import Resources from "../pages/Resources";
import AdminDashboard from "../modules/Admin/AdminDashboard";

import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";

// ================= SCROLL HANDLER =================
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollWithRetry = (id, tries = 10) => {
      if (tries === 0) return;

      const element = document.getElementById(id);
      const navHeight = document.querySelector("nav")?.offsetHeight || 100;

      if (element) {
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          10;

        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        setTimeout(() => scrollWithRetry(id, tries - 1), 120);
      }
    };

    const path = location.pathname;

    if (path === "/about") scrollWithRetry("about");
    else if (path === "/courses") scrollWithRetry("courses");
    else if (path === "/contact") scrollWithRetry("contact");
    else window.scrollTo({ top: 0, behavior: "smooth" });

  }, [location]);

  return null;
};

// ================= ROUTER =================
const AppRouter = () => {
  return (
    <>
      <ScrollToSection />

      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><Home /></Layout>} />

        <Route path="/fees" element={<Layout><Fees /></Layout>} />
        <Route path="/admission" element={<Layout><Admission /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* FALLBACK */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </>
  );
};

export default AppRouter;
