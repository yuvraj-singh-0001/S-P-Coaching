import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen pt-16 flex items-center justify-center md:justify-start">
      {/* FULL SCREEN BANNER */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-pages.png')" }}
      ></div>

      {/* VERTICAL BLUE STRIP ON LEFT - EXACTLY LIKE YOUR IMAGE */}
      {/* <div className="absolute left-0 top-0 h-full w-5 md:w-6 bg-[#0b3d87]"></div> */}

      {/* CONTENT - POSITIONED BESIDE BLUE STRIP */}
      <div className="relative ml-6 md:ml-10 lg:ml-16 mr-4 md:mr-8 max-w-2xl hover:scale-105 transition-transform duration-300">
        
        {/* CONTENT WITH TRANSPARENT BACKGROUND */}
        <div className="bg-black/20 md:bg-black/30 p-4 md:p-8 rounded-r-lg backdrop-blur-sm">
          
          <div className="text-white">
            
            {/* MAIN HEADING */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              Learn Today.<br />Build Your Future.
            </h1>

            {/* DIVIDER LINE */}
            <div className="w-32 h-[1px] bg-white/80 my-4 md:my-6"></div>

            {/* SUBTITLE */}
            <p className="text-lg md:text-xl mb-1">
              Quality coaching for
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-6">
              Class 9th to 12th | B.Sc Students | ITI Courses
            </p>

            {/* EXPERT GUIDANCE - SIMPLE BOX */}
            <div className="mb-8">
              <p className="text-lg md:text-xl italic border-l-3 border-yellow-400 pl-4 py-2">
                Expert Guidance for Your Success!
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                onClick={() => navigate("/enroll")}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 md:px-7 py-3 rounded-md font-semibold w-full sm:w-auto text-center"
              >
                Enroll Now
              </Button>

              <Button
                onClick={() => navigate("Contact")}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 md:px-7 py-3 rounded-md font-semibold w-full sm:w-auto text-center"
              >
                Contact Us
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;