import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Fees from "../pages/Fees";
import Admission from "../pages/Admission";



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

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
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
        <Route path="/fees" element={<Layout><Fees /></Layout>} />
        <Route path="/admission" element={<Layout><Admission /></Layout>} />
      </Routes>
    </>
  );
};

export default AppRouter;
