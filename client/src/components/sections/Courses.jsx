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