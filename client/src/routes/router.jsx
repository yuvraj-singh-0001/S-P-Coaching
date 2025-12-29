import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

// Yeh component URL change hone par automatically scroll karega
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    // Agar URL mein koi hash hai (like #about), toh us section par scroll karo
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -80; // Navbar ki height compensate karne ke liye
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
    // Agar simple path hai (like /about), toh uske hisaab se section par scroll karo
    else {
      const path = location.pathname;
      let targetId = 'home';
      
      if (path === '/about') targetId = 'about';
      else if (path === '/courses') targetId = 'courses';
      else if (path === '/contact') targetId = 'contact';
      
      const element = document.getElementById(targetId);
      if (element && targetId !== 'home') {
        setTimeout(() => {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      } else if (path === '/') {
        // Home page par directly top par le jao
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const AppRouter = () => {
  return (
    <>
      <ScrollToSection />
      <Routes>
        {/* Sab routes ek hi Home component ko point karenge */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><Home /></Layout>} />
        {/* Agar koi aur URL try kare, toh home par redirect ho jaye */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </>
  );
};

export default AppRouter;