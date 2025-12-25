import { useEffect, useRef, useState } from "react";

const AboutBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const aboutBg = new URL("/images/About-bg.png", import.meta.url).href;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 text-white"
      style={{
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* LIGHT GLOBAL OVERLAY */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/45"></div>

      <div className="relative z-10">

        {/* TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            About SP Coaching Center
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-2"></div>
        </div>

        {/* INTRO CARD */}
        <div
          className={`w-[95%] md:w-[85%] mx-auto mb-6
          bg-black/70 backdrop-blur-md 
          p-6 md:p-7 rounded-2xl border border-white/20 shadow-xl
          transition-all duration-700 
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-blue-100 text-base leading-relaxed mb-3">
            <span className="font-bold text-white">Established in 2018</span> in
            Paudali Bazar, Deoria, SP Coaching Center has emerged as a trusted
            name in quality education. Founded by{" "}
            <span className="text-yellow-300">Mr. Santosh Prasad</span>, we are
            committed to nurturing young minds and guiding them towards academic
            excellence.
          </p>

          <p className="text-blue-100 text-base leading-relaxed mb-3">
            We specialize in{" "}
            <span className="text-yellow-300">
              Class 9–12 (Science & Mathematics), B.Sc & ITI Courses
            </span>
            . Personalized attention + modern teaching = better results.
          </p>

          <p className="text-blue-100 text-base leading-relaxed">
            We believe in{" "}
            <span className="text-yellow-300">
              "Strong Foundation, Bright Future"
            </span>
            .
          </p>
        </div>

        {/* FOUNDER SECTION CARD */}
        <div
          className={`w-[95%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6
          bg-black/70 backdrop-blur-md
          rounded-2xl border border-white/20 shadow-xl
          p-6 md:p-7
          transition-all duration-700 
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* IMAGE */}
          <div className="flex items-center justify-center">
            <img
              src="/founder.jpg"   // <-- apni image ka path
              alt="Founder"
              className="w-full max-w-[420px] md:max-w-[500px] rounded-xl shadow-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-300">
              Mr. Santosh Prasad
            </h3>

            <p className="text-blue-200 text-sm md:text-base mb-3">
              Founder & Teacher
            </p>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-3">
              With a strong passion for teaching and student growth, he has been
              guiding students with excellence, discipline and concept-based
              learning.
            </p>

            <ul className="text-blue-100 text-sm md:text-base space-y-2">
              <li>🎓 M.Sc, B.Ed | UPTET | CTET</li>
              <li>⏳ 10+ Years Teaching Experience</li>
              <li>📍 Lohiya Intermediate College, Sahwa Deoria</li>
            </ul>

            <a
              href="/teachers"
              className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
            >
              See All Teachers
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutBanner;
