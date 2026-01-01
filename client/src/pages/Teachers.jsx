import React from "react";

const teachers = [
  {
    name: "Santosh Sir",
    role: "Senior Biology & Chemistry Faculty",
    qualification: "B.Sc, M.Sc, B.Ed | UPTET | CTET | BSTET",
    experience: "10+ Years of Teaching Experience",
    achievements:
      "Helped 300+ students score 90%+, guided multiple board toppers",
    motivation:
      "Teaching is not about completing the syllabus; it is about building confidence and creating future achievers.",
    desc: "Specializes in concept clarity, practical understanding, and strong exam preparation strategies in Biology and Chemistry.",
    image: "/images/Santosh-sir.webp",
  },
  {
    name: "Priya Ma'am",
    role: "Mathematics & English Faculty",
    qualification: "B.A (Maths), B.Ed, M.A | TET | CTET | BSTET",
    rank: "University 2st Rank Holder in B.A (Maths)",
    experience: "6+ Years of Teaching Experience",
    achievements:
      "Students consistently scoring above 95% with outstanding improvement in weak students.",
    motivation:
      "Mathematics is not hard; it becomes easy when it is taught with patience and proper guidance.",
    desc: "Expert in logic building, step-by-step explanation, and exam-oriented preparation with complete clarity.",
    image: "/images/Priya-maam.webp",
  },
  {
    name: "Ajim Sir",
    role: "Physics Faculty",
    qualification: "B.Sc, M.Sc",
    rank: "University 1st Rank Holder in B.Sc & M.Sc",
    experience: "2+ Years of Teaching Experience",
    achievements:
      "Produced multiple district rankers, known for crystal-clear explanation and strong command over Physics concepts.",
    motivation:
      "Success is not luck; it is dedication with the right guidance. Every student can achieve excellence.",
    desc: "Expert in Physics concepts, numerical problem solving, and easy-to-understand explanation with doubt support.",
    image: "/images/Ajim-sir.webp",
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
              {/* IMAGE FIX — NO BACKGROUND */}
              <div className="w-full h-60 md:h-64 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-3">{t.name}</h2>
              <p className="text-blue-700 font-semibold text-sm">{t.role}</p>

              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Qualification:</span> {t.qualification}
                </p>
                {t.rank && (
                  <p>
                    <span className="font-semibold">Rank:</span> {t.rank}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Experience:</span> {t.experience}
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-2">{t.desc}</p>

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
