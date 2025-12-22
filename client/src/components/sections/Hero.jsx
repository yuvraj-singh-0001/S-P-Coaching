import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen  pt-14 flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-pages.png')" }}
      ></div>

      {/* LEFT BLUE PANEL - 50% width */}
      <div className="absolute top-0 left-0 h-full w-full md:w-1/2 bg-[#0b3d87]/92"></div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d87]/95 via-[#0b3d87]/30 to-transparent"></div>

      {/* CONTENT CONTAINER - कम padding */}
      <div className="relative w-full max-w-7xl mx-auto  mt-6 px-1 sm:px-2 md:px-4 h-full flex items-center ">
        {/* CONTENT - compact layout */}
        <div className="w-full md:w-1/2 px-1 sm:px-2 md:px-3 lg:px-5 text-white">
          
          {/* HEADING - छोटा टेक्स्ट */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Learn Today.<br />Build Your Future.
          </h1>

          {/* THIN WHITE LINE */}
          <div className="w-28 sm:w-32 md:w-36 h-[1.5px] bg-white/70 mt-3 md:mt-4 mb-3 md:mb-4"></div>

          {/* SUB TEXT - छोटा */}
          <div className="space-y-1">
            <p className="text-sm sm:text-base md:text-lg">
              Quality coaching for
            </p>
            <p className="text-base sm:text-lg md:text-xl font-semibold">
              Class 9th to 12th | B.Sc Students | ITI Courses
            </p>
          </div>

          {/* EXPERT GUIDANCE STRIP - compact */}
          <div className="mt-4 md:mt-6 bg-white/20 px-3 py-2.5 w-full max-w-sm border border-white/30">
            <p className="italic text-white text-sm sm:text-base md:text-lg">
              Expert Guidance for Your Success!
            </p>
          </div>

          {/* BUTTONS - compact */}
          <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 mt-4 md:mt-6">
            <Button
              onClick={() => navigate("/enroll")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2.5 rounded text-sm sm:text-base font-medium w-full sm:w-auto text-center"
            >
              Enroll Now
            </Button>

            <Button
              onClick={() => navigate("/contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 rounded text-sm sm:text-base font-medium w-full sm:w-auto text-center"
            >
              Contact Us
            </Button>
          </div>

        </div>
        
        {/* RIGHT HALF */}
        <div className="hidden md:block md:w-1/2"></div>
      </div>
    </section>
  );
};

export default Hero;