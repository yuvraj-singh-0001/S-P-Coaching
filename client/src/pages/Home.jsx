import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      {/* ---- HERO ---- */}
      <div id="home">
        <Hero />
      </div>

      {/* ---- ABOUT ---- */}
      <div
        id="about"
        className="scroll-mt-[110px]"  // fixed navbar ke liye perfect offset
      >
        <About />
      </div>

      {/* ---- COURSES ---- */}
      <div
        id="courses"
        className="scroll-mt-[110px]"
      >
        <Courses />
      </div>

      {/* ---- CONTACT ---- */}
      <div
        id="contact"
        className="scroll-mt-[110px]"
      >
        <Contact />
      </div>
    </>
  );
};

export default Home;
