import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const feesData = [
  {
    title: "Class 9th & 10th (All Subjects)",
    desc: "Complete syllabus coverage for all subjects with tests, practice & doubts.",
    original: 600,
    offer: 400,
    duration: "Full Academic Year",
  },
  {
    title: "Class 11th & 12th (Per Subject)",
    desc: "Focused Science preparation with concept clarity & regular assessments.",
    original: 220,
    offer: 150,
    duration: "Full Academic Year",
  },
  {
    title: "B.Sc (Per Subject)",
    desc: "Clear explanations, problem solving & exam oriented study.",
    original: 750,
    offer: 500,
    duration: "Semester Based",
  },
  {
    title: "ITI (Per Subject)",
    desc: "Structured technical learning with regular practice & guidance.",
    original: 600,
    offer: 400,
    duration: "Semester Based",
  },
  {
    title: "Polytechnic (Per Subject)",
    desc: "Practical + exam-focused preparation with support.",
    original: 800,
    offer: 550,
    duration: "Semester Based",
  },
];

const PriceCard = ({ item }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setShowOffer(true);
      }, 1200); // Offer slow + premium feel
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-white border border-gray-300 hover:border-blue-700 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer"
    >
      <span className="px-2 py-1 bg-green-100 text-green-700 text-[11px] font-semibold rounded-full">
        Limited Time Offer (30% Approx OFF)
      </span>

      <h2 className="text-base font-bold text-gray-800 mt-2 leading-tight">
        {item.title}
      </h2>

      <p className="text-gray-600 text-sm mb-1">
        {item.desc}
      </p>

      {/* PRICE ONLY ANIMATION */}
      <div className="mt-1">
        {!showOffer && (
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg font-bold text-gray-700"
          >
            ₹ {item.original} / Month
          </motion.p>
        )}

        {showOffer && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-sm text-gray-400 line-through"
            >
              ₹ {item.original} / Month
            </motion.p>

            <motion.p
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 90 }}
              className="text-xl font-bold text-blue-700"
            >
              ₹ {item.offer} / Month
            </motion.p>
          </>
        )}

        <p className="text-gray-500 text-xs">
          {item.duration}
        </p>
      </div>

      {/* BENEFITS */}
      <ul className="mt-2 text-gray-700 text-sm space-y-1">
        <li>• Free handwritten notes</li>
        <li>• Model papers</li>
        <li>• 10+ years previous questions with solutions</li>
        <li>• Regular tests & doubt clearing</li>
      </ul>

      {/* BUTTONS */}
      <div className="mt-3 flex gap-2">
        <button
          className="w-1/2 bg-blue-700 hover:bg-blue-800 text-white py-1.5 rounded-md transition text-xs"
          onClick={() =>
            navigate("/admission", {
              state: { courseName: item.title },
            })
          }
        >
          Enroll Now
        </button>

        <button
          className="w-1/2 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white py-1.5 rounded-md transition text-xs"
          onClick={() => navigate("/admission")}
        >
          Book Demo
        </button>
      </div>
    </div>
  );
};

const Fees = () => {
  return (
    <section className="pt-24 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Fee Structure
          </h1>
          <div className="w-24 h-[3px] bg-yellow-400 mx-auto mt-1"></div>
          <p className="text-gray-600 mt-2 text-sm">
            Transparent, affordable and student-friendly fee plans
          </p>
        </div>

        {/* FAST LOADING CARDS */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {feesData.map((item, index) => (
            <PriceCard key={index} item={item} />
          ))}
        </div>

        <p className="text-gray-500 text-xs text-center mt-4">
          * Fees may slightly vary based on subjects & requirements.
        </p>
      </div>
    </section>
  );
};

export default Fees;
