import React from "react";
import { Download } from "lucide-react";

const resources = [
  {
    title: "Class 9th – Handwritten Notes",
    desc: "Complete handwritten notes with easy explanations and important points.",
    type: "Notes",
    file: "/resources/class9-notes.pdf",
  },
  {
    title: "Class 10th – Question Paper Set",
    desc: "Latest board pattern papers with important exam-oriented questions.",
    type: "Question Papers",
    file: "/resources/class10-papers.pdf",
  },
  {
    title: "Class 10th – Solved Papers",
    desc: "Fully solved papers with step-by-step solutions.",
    type: "Solved Papers",
    file: "/resources/class10-solved.pdf",
  },
  {
    title: "Class 11 & 12 – Physics Notes",
    desc: "Concept-based notes with formulas and key points.",
    type: "Notes",
    file: "/resources/physics-notes.pdf",
  },
  {
    title: "B.Sc Study Material",
    desc: "High-quality study material for B.Sc students.",
    type: "Books",
    file: "/resources/bsc-material.pdf",
  },
];

const Resources = () => {
  return (
    <section className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Study Resources
          </h1>
          <div className="w-28 h-[3px] bg-yellow-400 mx-auto mt-2"></div>
          <p className="text-gray-600 mt-2 text-sm">
            Download and read study materials, notes, papers and books
          </p>
        </div>

        {/* RESOURCE CARDS */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {resources.map((r, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 hover:border-blue-700 rounded-xl shadow-sm hover:shadow-xl transition-all p-5"
            >
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {r.type}
              </span>

              <h2 className="text-lg font-bold text-gray-800 mt-2">
                {r.title}
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                {r.desc}
              </p>

              <div className="mt-4 flex gap-2">
                <a
                  href={r.file}
                  target="_blank"
                  className="w-1/2 text-center bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md text-sm transition"
                >
                  Read
                </a>

                <a
                  href={r.file}
                  download
                  className="w-1/2 flex items-center justify-center gap-1 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white py-2 rounded-md text-sm transition"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>

            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          * More study materials are regularly updated.
        </p>
      </div>
    </section>
  );
};

export default Resources;
