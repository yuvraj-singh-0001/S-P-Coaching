import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Courses from "../components/sections/Courses";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Courses />
      <Contact />
    </Layout>
  );
};

export default Home;