import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section  // ID HATA DIYA
      ref={sectionRef}
      className="relative w-full py-10 md:py-14 bg-[#F9FAFB] text-gray-800 "
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* TITLE */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            About SP Coaching Center
          </h2>
          <div className="w-16 md:w-20 h-1 bg-yellow-400 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        {/* INTRO CARD - Your original introduction */}
        <div
          className={`w-full mx-auto mb-8 md:mb-10
          bg-white p-5 md:p-7 rounded-xl shadow-lg border border-gray-100 hover:border-blue-300 
          transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-4">
            <span className="font-bold">Established in 2018</span> in Paudali Bazar, Deoria, SP Coaching Center has emerged as a trusted name in quality education. Founded by{" "}
            <span className="text-yellow-600 font-semibold">
              Mr. Santosh Prasad
            </span>, we are committed to nurturing young minds and guiding them towards academic excellence.
          </p>

          <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-4">
            We specialize in{" "}
            <span className="text-yellow-600 font-semibold">
              Class 9–12 (Science & Mathematics), B.Sc & ITI Courses
            </span>.
            Personalized attention + modern teaching = better results.
          </p>

          <p className="text-gray-900 text-sm md:text-base leading-relaxed">
            We believe in{" "}
            <span className="text-yellow-600 font-semibold">
              "Strong Foundation, Bright Future"
            </span>
            .
          </p>
        </div>

        {/* WHY CHOOSE SP COACHING - Your card design */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8 lg:mb-10 text-gray-900">
            Why Choose SP Coaching?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">

            {/* DIGITAL RESOURCES */}
            <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl shadow-lg border border-gray-100 hover:border-blue-300 
            transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="text-2xl md:text-3xl text-yellow-600">💻</div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Digital Features</h4>
              </div>
              <ul className="space-y-2 md:space-y-2.5">
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Online Test Series & Results</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Quick Question Practice</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Online Attendance Tracking</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Gmail Notifications</span>
                </li>
              </ul>
            </div>

            {/* STUDY MATERIALS */}
            <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl shadow-lg border border-gray-100 hover:border-blue-300 
            transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="text-2xl md:text-3xl text-yellow-600">📚</div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Study Support</h4>
              </div>
              <ul className="space-y-2 md:space-y-2.5">
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Handwritten Notes</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Previous Year Papers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>3 Doubt Sessions Weekly</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Weekly Test Schedule</span>
                </li>
              </ul>
            </div>

            {/* FACILITIES */}
            <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl shadow-lg border border-gray-100 hover:border-blue-300 
            transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="text-2xl md:text-3xl text-yellow-600">🏫</div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900">Facilities</h4>
              </div>
              <ul className="space-y-2 md:space-y-2.5">
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Well-Ventilated Classrooms</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Personalized Attention</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Modern Teaching Aids</span>
                </li>
                <li className="flex items-start gap-2 text-gray-900 text-sm md:text-base">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Fees Status Tracking</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* FOUNDER SECTION */}
        <div
          className={`w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-8 md:mt-10
          bg-white rounded-xl shadow-lg border border-gray-100 hover:border-blue-300 
          transition-all duration-300 hover:shadow-xl hover:scale-[1.02] p-5 md:p-7
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* IMAGE */}
          <div className="flex items-center justify-center ">
            <img
              src="/images/Founder.webp"
              alt="Founder"
              loading="lazy"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-600">
              Mr. Santosh Sir
            </h3>

            <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4 font-bold">
              Founder & Teacher
            </p>

            <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-4">
              With a strong passion for teaching and student growth, he has been
              guiding students with excellence, discipline and concept-based
              learning.
            </p>

            <ul className="text-gray-900 text-sm md:text-base space-y-2 mb-5 md:mb-6">
              <li className="flex items-center font-bold">
                <span className="mr-2 ">🎓</span>
                BSc, M.Sc, B.Ed | UPTET | CTET |BSTET
              </li>
              <li className="flex items-center">
                <span className="mr-2">⏳</span>
                10+ Years Teaching Experience
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                Lohiya Intermediate College, Sahwa Deoria
              </li>
            </ul>

            <a
              href="/teachers"
              className="inline-block px-5 md:px-6 py-2 md:py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition text-sm md:text-base"
            >
              See All Teachers
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;