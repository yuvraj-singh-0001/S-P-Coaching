import React from "react";

const teachers = [
  {
    name: "Rajesh Kumar",
    role: "Senior Physics Faculty",
    qualification: "M.Sc (Physics), B.Ed",
    university: "Banaras Hindu University (BHU)",
    rank: "University Top Rank Holder",
    experience: "10+ Years of Teaching Experience",
    achievements: "Helped 300+ students score 90%+, guided multiple board toppers",
    motivation:
      "Teaching is not about completing syllabus, it is about building confidence and creating future achievers.",
    desc: "Specializes in concept clarity, numerical problem solving and real-life understanding of Physics to make learning interesting and practical.",
    image: "/images/teacher1.webp",
  },
  {
    name: "Neha Sharma",
    role: "Mathematics Faculty",
    qualification: "M.Sc (Mathematics)",
    university: "University of Delhi",
    rank: "Gold Medalist",
    experience: "8+ Years Experience",
    achievements: "Students consistently scoring above 95%, Excellent track record in weak-to-topper transformation",
    motivation:
      "Mathematics is not hard; it becomes easy when taught with patience and love.",
    desc: "Expert in logic building, step-by-step explanation and strong focus on exam-oriented preparation with clarity.",
    image: "/images/teacher2.webp",
  },
  {
    name: "Amit Verma",
    role: "Chemistry Faculty",
    qualification: "M.Sc (Chemistry)",
    university: "Allahabad University",
    rank: "Top Department Scholar",
    experience: "7+ Years Experience",
    achievements: "Produced multiple district rankers, known for crystal clear explanation style",
    motivation:
      "Success is not luck, it is dedication + right guidance. Every student can achieve great results.",
    desc: "Expert in chemical reactions, numerical solving, and board exam strategy with easy explanations and doubt solving.",
    image: "/images/teacher3.webp",
  },
];

const Teachers = () => {
  return (
    <section className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Expert Teachers
          </h1>
          <div className="w-28 h-[3px] bg-yellow-400 mx-auto mt-2"></div>
          <p className="text-gray-600 mt-2 text-sm">
            Highly qualified, experienced and passionate educators shaping bright futures
          </p>
        </div>

        {/* TEACHER CARDS */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {teachers.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 hover:border-blue-700 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="w-full h-60 object-cover rounded-lg mb-3"
              />

              <h2 className="text-xl font-bold text-gray-800">{t.name}</h2>

              <p className="text-blue-700 font-semibold text-sm">
                {t.role}
              </p>

              <div className="mt-2 text-sm text-gray-700">
                <p><span className="font-semibold">Qualification:</span> {t.qualification}</p>
                <p><span className="font-semibold">University:</span> {t.university}</p>
                <p><span className="font-semibold">Rank:</span> {t.rank}</p>
                <p><span className="font-semibold">Experience:</span> {t.experience}</p>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                {t.desc}
              </p>

              <div className="mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {t.achievements}
                </span>
              </div>

              <p className="italic text-gray-700 text-sm mt-3 border-l-4 border-yellow-400 pl-3">
                “{t.motivation}”
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Teachers;
