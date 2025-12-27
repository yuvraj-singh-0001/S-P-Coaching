import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const Courses = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Class 9-12 Science",
      subjects: ["Physics", "Mathematics"],
      duration: "Annual Program",
      icon: "🎓",
      image: "/images/school.png",
      features: [
        "Complete UP Board Syllabus",
        "Weekly Tests & Assessments",
        "Previous Year Question Papers",
        "Regular Doubt Sessions",
        "Handwritten Notes",
        "Mock Board Exams"
      ],
      details: "Complete preparation for UP Board exams with focus on concept clarity and exam strategy."
    },
    {
      id: 2,
      title: "B.Sc Programs",
      subjects: ["Physics", "Chemistry", "Mathematics", "Zoology", "Botany"],
      duration: "Semester-wise",
      icon: "🔬",
      image: "/images/bsc.png",
      features: [
        "University Syllabus Coverage",
        "Practical Lab Guidance",
        "Semester Exam Preparation",
        "Model Papers Practice",
        "Study Material Provided",
        "Regular Tests"
      ],
      details: "Comprehensive coaching for B.Sc students with emphasis on both theory and practicals."
    },
    {
      id: 3,
      title: "ITI Courses",
      subjects: ["Technical Training", "Vocational Skills"],
      duration: "1-2 Years",
      icon: "⚙️",
      image: "/images/iti.png",
      features: [
        "Industry-relevant Training",
        "Practical Workshops",
        "Skill Development",
        "Placement Assistance",
        "Certificate Courses",
        "Hands-on Experience"
      ],
      details: "Job-oriented technical training with practical workshops and industry exposure."
    },
    {
      id: 4,
      title: "Polytechnic",
      subjects: ["Diploma in Engineering"],
      duration: "3 Years",
      icon: "🏗️",
      image: "/images/hero-pages.png",
      features: [
        "Engineering Fundamentals",
        "Practical Knowledge",
        "Semester-wise Coaching",
        "Diploma Preparation",
        "Technical Skills",
        "Project Guidance"
      ],
      details: "Complete support for Polytechnic diploma students with focus on engineering concepts."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="w-full py-8 md:py-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* TITLE */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our Courses
          </h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Quality coaching for academic and career success
          </p>
        </div>

        {/* COURSES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative rounded-lg md:rounded-xl shadow-lg border border-gray-200 
              hover:shadow-xl transition-all duration-300 overflow-hidden group min-h-[250px] md:min-h-[280px]"
            >
              {/* BACKGROUND IMAGE COVERING ENTIRE CARD */}
              <div className="absolute inset-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {/* DARK OVERLAY FOR BETTER TEXT READABILITY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
              </div>

              {/* CONTENT OVERLAY */}
              <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-5">
                {/* TOP CONTENT */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl md:text-3xl text-white drop-shadow-lg">{course.icon}</span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                        {course.title}
                      </h3>
                      <p className="text-white/90 text-xs md:text-sm bg-yellow-600/80 px-2 py-0.5 rounded-full inline-block mt-1">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  {/* SUBJECTS */}
                  <div className="mb-2">
                    <p className="text-white/90 text-xs mb-1">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded text-xs border border-white/30"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EXPANDABLE CONTENT - WITH SCROLL */}
                <div className={`transition-all duration-300 ${
                  expandedCard === course.id ? 'max-h-32 md:max-h-36' : 'max-h-0'
                } overflow-hidden`}>
                  <div className="mt-2 pt-2 border-t border-white/30">
                    {/* DETAILS */}
                    <div className="mb-2">
                      <p className="text-white/90 text-xs md:text-sm">{course.details}</p>
                    </div>

                    {/* FEATURES WITH SCROLL */}
                    <div className="max-h-20 overflow-y-auto pr-2 scrollbar-thin">
                      <p className="text-white font-medium text-xs md:text-sm mb-1">Features:</p>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <CheckCircle className="text-yellow-400 mt-0.5 flex-shrink-0" size={12} />
                            <span className="text-white/90 text-xs">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* TOGGLE BUTTON - BOTTOM */}
                <button
                  onClick={() => toggleExpand(course.id)}
                  className="w-full mt-2 flex items-center justify-center gap-1 text-white text-xs font-semibold 
                  hover:text-yellow-300 transition-colors py-1 bg-black/30 backdrop-blur-sm rounded-lg"
                >
                  {expandedCard === course.id ? (
                    <>
                      Show Less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE SECTION */}
        <div className="bg-white rounded-lg md:rounded-xl shadow border border-gray-200 p-4 md:p-6 mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Why Choose Our Courses?
            </h3>
            <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: "👨‍🏫", title: "Expert Faculty", desc: "10+ years experience" },
              { icon: "📚", title: "Study Material", desc: "Notes & PYQs" },
              { icon: "🎯", title: "Regular Tests", desc: "Weekly assessments" },
              { icon: "💻", title: "Digital Support", desc: "Online features" },
              { icon: "💬", title: "Doubt Sessions", desc: "3 per week" },
              { icon: "📊", title: "Progress Reports", desc: "Regular tracking" },
              { icon: "🏫", title: "Good Facilities", desc: "Quality classrooms" },
              { icon: "💰", title: "Affordable Fees", desc: "Reasonable cost" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <h4 className="font-bold text-gray-900 text-xs md:text-sm mb-0.5">{item.title}</h4>
                <p className="text-gray-600 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg md:rounded-xl p-4 md:p-6 text-white shadow">
            <div className="max-w-xl mx-auto">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Start Your Learning Journey
              </h3>
              <p className="mb-4 opacity-90 text-sm md:text-base">
                Limited seats available for 2024-25 session.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                <button className="bg-yellow-400 text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-lg 
                font-semibold hover:bg-yellow-300 transition-all duration-300 text-sm md:text-base">
                  Book Free Demo Class
                </button>
                <button className="bg-transparent border border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg 
                font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 text-sm md:text-base">
                  📞 Call: +91 88875 81808
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Courses;