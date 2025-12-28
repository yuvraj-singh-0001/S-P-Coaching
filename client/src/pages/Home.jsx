// import Layout from "../components/layout/Layout"; // REMOVE THIS
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    // <Layout> REMOVE THIS
    <>
      <Hero />
      <About />
      <Courses />
      <Contact />
    </>
    // </Layout> REMOVE THIS
  );
};

export default Home;