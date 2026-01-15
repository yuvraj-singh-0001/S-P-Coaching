import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";

// ✅ SEO HOOK (React 19 SAFE)
import useSEO from "../hooks/useSEO";

const Home = () => {

  // ================= SEO (SAFE, NO SIDE EFFECT) =================
  useSEO({
    title:
      " SP Coaching Paudali Best Coaching Classes in Deoria | Class 9–12 | BSc | Polytechnic",
    description:
      "SP Coaching Classes in Paudali Bazar, Deoria offers expert coaching for Class 9–12, BSc and Polytechnic students with disciplined guidance and proven results."
  });

  return (
    <>
      {/* =========================================================
          SEO H1 (Invisible but Google-readable)
          ========================================================= */}
      <h1 className="sr-only">
        Best Coaching Classes in Deoria – SP Coaching Classes Paudali Bazar
      </h1>

      {/* ---- HERO ---- */}
      <div id="home">
        <Hero />
      </div>

      {/* ---- ABOUT ---- */}
      <div
        id="about"
        className="scroll-mt-[80px]"
      >
        <About />
      </div>

      {/* ---- COURSES ---- */}
      <div
        id="courses"
        className="scroll-mt-[80px]"
      >
        <Courses />
      </div>

      {/* ---- CONTACT ---- */}
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
