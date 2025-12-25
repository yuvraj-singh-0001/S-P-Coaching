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

      {/* BLUE STRIP - SAME AS BEFORE */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-gradient-to-b from-blue-700 to-blue-900"></div> */}

      {/* CONTENT - POSITIONED BESIDE BLUE STRIP */}
      <div className="relative ml-6 md:ml-10 lg:ml-16 mr-4 md:mr-8 max-w-2xl hover:scale-105 transition-transform duration-300">
        
        {/* CONTENT WITH TRANSPARENT BACKGROUND */}
        <div className="bg-black/20 md:bg-black/30 p-4 md:p-8 rounded-r-lg backdrop-blur-sm">
          
          <div className="text-white">
            
            {/* MAIN HEADING - MORE IMPACTFUL */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              Your Success<br />Our Commitment
            </h1>

            {/* DIVIDER LINE */}
            <div className="w-32 h-[1px] bg-white/80 my-4 md:my-6"></div>

            {/* SUBTITLE - CLEARER */}
            <p className="text-lg md:text-xl mb-1 font-medium">
              Premier Coaching for
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-6 text-yellow-300">
               Class 9 to 12 • B.Sc • ITI Students
            </p>

            {/* KEY BENEFIT - MORE COMPELLING */}
            <div className="mb-8">
              <p className="text-lg md:text-xl italic border-l-3 border-yellow-400 pl-4 py-2 bg-white/10 rounded-r">
                📚 15+ Years | 5000+ Successful Students
              </p>
            </div>

            {/* TRUST INDICATOR - SIMPLE */}
            <div className="mb-6 text-sm text-white/80">
              <span className="bg-green-600/30 px-3 py-1 rounded-full">✅ 85%+ Success Rate</span>
              <span className="mx-2">•</span>
              <span className="bg-blue-600/30 px-3 py-1 rounded-full">Award Winning Faculty</span>
            </div>

            {/* BUTTONS - SAME STYLE */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                onClick={() => navigate("/enroll")}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 md:px-7 py-3 rounded-md font-semibold w-full sm:w-auto text-center transform hover:scale-105 transition-transform shadow-lg"
              >
                 Start Free Demo
              </Button>

              <Button
                onClick={() => navigate("/contact")}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-6 md:px-7 py-3 rounded-md font-semibold w-full sm:w-auto text-center transition-colors"
              >
                📞 Call Now
              </Button>
            </div>

            {/* PHONE NUMBER VISIBLE */}
            <div className="mt-6 text-center sm:text-left">
              <a 
                href="tel:+918887581808" 
                className="text-white hover:text-yellow-300 text-lg font-medium inline-flex items-center gap-2"
              >
                <span className="text-xl"></span> +91 88875 81808
              </a>
              <p className="text-white/70 text-sm mt-1">Mon-Sat: 6AM - 10AM (Morning -Shift), 3PM - 6:30PM (Evening-shift) </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;