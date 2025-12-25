import { CheckCircle, BookOpen, Clock, Users, FileText, Brain } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      stream: "Science Stream",
      subjects: [
        { name: "Biology", icon: "🧬" },
        { name: "Mathematics", icon: "📐" },
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      stream: "Commerce Stream",
      subjects: [
        { name: "Accountancy", icon: "📊" },
        { name: "Business Studies", icon: "📈" },
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  const benefits = [
    {
      icon: <Brain className="text-blue-600" size={24} />,
      title: "Strong Concepts",
      description: "Clear explanations and conceptual learning",
    },
    {
      icon: <FileText className="text-purple-600" size={24} />,
      title: "Regular Tests",
      description: "Weekly tests and performance evaluation",
    },
    {
      icon: <BookOpen className="text-green-600" size={24} />,
      title: "Board Preparation",
      description: "Focused on UP Board exam pattern",
    },
    {
      icon: <CheckCircle className="text-orange-600" size={24} />,
      title: "Structured Notes",
      description: "Neat handwritten study material",
    },
    {
      icon: <Users className="text-red-600" size={24} />,
      title: "Doubt Sessions",
      description: "Regular doubt-clearing sessions",
    },
    {
      icon: <Clock className="text-indigo-600" size={24} />,
      title: "Disciplined Learning",
      description: "Structured timetable and focus",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Courses Offered
          </h2>
          <p className="text-lg text-gray-600 mb-4">UP Board – Classes 9 to 12</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`${course.bgColor} rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{course.stream}</h3>
                <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-2xl">📚</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {course.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="text-lg font-semibold text-gray-800">{subject.name}</span>
                    </div>
                    <div className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                      Classes 9-12
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t">
                <h4 className="font-semibold text-gray-700 mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    Complete syllabus coverage
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    Previous year papers
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    Sample papers practice
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our goal is not only to prepare students for exams, but to build confidence, 
            improve understanding, and help them achieve excellent results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h4>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Admission Open for 2024-25 Session
            </h3>
            <p className="mb-6 opacity-90">
              Limited seats available. Join S P Coaching Center for quality education and excellent results.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Enroll Now
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
// import { useEffect, useRef } from 'react';

// const aboutBg = new URL('/images/About-bg.png', import.meta.url).href;
// const schoolImg = new URL('/images/school.png', import.meta.url).href;
// const bscImg = new URL('/images/bsc.png', import.meta.url).href;
// const itiImg = new URL('/images/iti.png', import.meta.url).href;

// const AboutBanner = () => {
//   const sectionRef = useRef(null);
//   const cardsRef = useRef([]);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     const observerOptions = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1
//     };

//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           // Title animation
//           if (entry.target === titleRef.current) {
//             entry.target.classList.remove('opacity-0', '-translate-y-8');
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//           }
          
//           // Cards animation
//           if (cardsRef.current.includes(entry.target)) {
//             const index = cardsRef.current.indexOf(entry.target);
//             setTimeout(() => {
//               entry.target.classList.remove('opacity-0');
//               if (index === 0) {
//                 entry.target.classList.remove('-translate-x-20');
//                 entry.target.classList.add('translate-x-0');
//               } else if (index === 1) {
//                 entry.target.classList.remove('translate-y-20');
//                 entry.target.classList.add('translate-y-0');
//               } else if (index === 2) {
//                 entry.target.classList.remove('translate-x-20');
//                 entry.target.classList.add('translate-x-0');
//               }
//             }, index * 200);
//           }
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, observerOptions);

//     // Observe title
//     if (titleRef.current) {
//       observer.observe(titleRef.current);
//     }

//     // Observe cards
//     cardsRef.current.forEach((card, index) => {
//       if (card) {
//         observer.observe(card);
//       }
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   const cards = [
//     { 
//       img: schoolImg, 
//       title: "School Classes 9th to 12th", 
//       subtitle: "Biology & Mathematics",
//       bgColor: "bg-blue-700",
//       fromLeft: true
//     },
//     { 
//       img: bscImg, 
//       title: "B.Sc Coaching", 
//       subtitle: "Zoology • Botany • Chemistry • Physics • Mathematics",
//       bgColor: "bg-indigo-700",
//       fromBottom: true
//     },
//     { 
//       img: itiImg, 
//       title: "ITI Courses", 
//       subtitle: "Technical & Vocational Training",
//       bgColor: "bg-indigo-700",
//       fromRight: true
//     }
//   ];

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full py-14 md:py-22 bg-no-repeat bg-cover bg-center overflow-hidden"
//       style={{ backgroundImage: `url(${aboutBg})` }}
//     >
//       <h2 
//         ref={titleRef}
//         className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center mb-12 opacity-0 -translate-y-8 transition-all duration-700"
//       >
//         Welcome to SP Coaching Center
//       </h2>
      
//       <div className="container mx-auto px-4 mt-8">
//         <div className="grid md:grid-cols-3 gap-8">
//           {cards.map((card, index) => (
//             <div
//               key={index}
//               ref={(el) => (cardsRef.current[index] = el)}
//               className={`
//                 rounded-xl overflow-hidden shadow-xl bg-white/95 
//                 transition-all duration-700
//                 transform
//                 ${card.fromLeft ? '-translate-x-20' : ''}
//                 ${card.fromRight ? 'translate-x-20' : ''}
//                 ${card.fromBottom ? 'translate-y-20' : ''}
//                 opacity-0
//                 hover:shadow-2xl hover:-translate-y-2
//               `}
//               style={{
//                 transitionDelay: `${index * 100}ms`,
//                 transitionProperty: 'transform, opacity, box-shadow'
//               }}
//             >
//               {/* Image Container - NO ZOOM EFFECT */}
//               <div className="overflow-hidden">
//                 <img
//                   src={card.img}
//                   className="w-full aspect-[4/3] object-cover"
//                   alt={card.title}
//                 />
//               </div>
              
//               {/* Card Content */}
//               <div className={`${card.bgColor} text-white text-center py-4 relative overflow-hidden group`}>
//                 {/* Simple shine effect - no animation */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
//                 <h3 className="text-xl font-bold mb-2 relative z-10">
//                   {card.title}
//                 </h3>
//                 <p className="text-sm opacity-90 relative z-10">
//                   {card.subtitle}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutBanner;