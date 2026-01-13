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
      <div
        id="contact"
        // className="scroll-mt-[80px]"
      >
        <Contact />
      </div>
    </>
  );
};

export default Home;
