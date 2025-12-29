import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      {/* Yeh wrappers important hain scroll ke liye */}
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="courses">
        <Courses />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;