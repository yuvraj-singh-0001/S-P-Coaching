import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollNow = (element) => {
      if (!element) return;

      setTimeout(() => {
        const navHeight = document.querySelector("nav")?.offsetHeight || 100;
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          10;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 120);
    };

    // If URL has #about, #courses etc
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      scrollNow(element);
    } 
    else {
      // Normal routes (/about /courses /contact)
      const path = location.pathname;
      let targetId = "home";

      if (path === "/about") targetId = "about";
      else if (path === "/courses") targetId = "courses";
      else if (path === "/contact") targetId = "contact";

      const element = document.getElementById(targetId);

      if (element && targetId !== "home") {
        scrollNow(element);
      } else if (path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><Home /></Layout>} />
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </>
  );
};

export default AppRouter;
