import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../../config/apiconfig";
import { useAdminAuth } from "../Admin/AdminAuthContext";

const Admission = () => {
  const location = useLocation();
  const { user } = useAdminAuth();

  // course from Fees page
  const selectedCourse = location.state?.courseName || "";

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  // ================= FORM STATE =================
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= AUTO FILL FROM GOOGLE / LOGIN ================= */
  useEffect(() => {
    if (user) {
      setName((prev) => prev || user.name || "");
      setEmail((prev) => prev || user.email || "");
    }
  }, [user]);

  /* ================= SUBJECT LOGIC ================= */
  useEffect(() => {
    if (!selectedCourse) return;

    if (selectedCourse.includes("9th & 10th")) {
      setSubjects(["All Subjects"]);
      setSelectedSubject("All Subjects");
      return;
    }

    if (selectedCourse.includes("11th & 12th")) {
      setSubjects([
        "All Subjects with Mathematics",
        "All Subjects with Biology",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
      ]);
      setSelectedSubject("");
      return;
    }

    if (selectedCourse.includes("B.Sc")) {
      setSubjects([
        "All Subjects",
        "Physics",
        "Chemistry",
        "Mathematics",
        "Zoology",
        "Botany",
      ]);
      setSelectedSubject("");
      return;
    }

    if (selectedCourse.includes("Polytechnic")) {
      setSubjects(["Physics", "Chemistry", "Mathematics"]);
      setSelectedSubject("");
      return;
    }

    if (selectedCourse.includes("ITI")) {
      setSubjects([
        "Electrician",
        "Fitter",
        "Welder",
        "Wireman",
        "Mechanic",
        "Draftsman",
      ]);
      setSelectedSubject("");
      return;
    }
  }, [selectedCourse]);

  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async () => {
    if (
      !name ||
      !phone ||
      !email ||
      (!selectedSubject && !selectedCourse.includes("9th & 10th"))
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API.STUDENT}/admission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          className: selectedCourse,
          subject: selectedSubject,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("🎉 Admission Form Submitted Successfully!");
        setPhone(""); // optional reset
      } else {
        setMessage(data.message || "Failed to submit form");
      }
    } catch {
      setMessage("Server error or API not responding");
    }

    setLoading(false);
  };

  return (
    <section className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Admission Form
        </h1>
        <div className="w-24 h-[3px] bg-yellow-400 mx-auto my-3"></div>

        <p className="text-center text-gray-600 mb-6">
          Your details are auto-filled. You can edit them if needed.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          {/* COURSE */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">
              Selected Course
            </label>
            <input
              type="text"
              value={selectedCourse}
              readOnly
              className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* NAME */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>

          {/* SUBJECT */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">
              Select Subject
            </label>

            {selectedCourse.includes("9th & 10th") ? (
              <input
                readOnly
                value="All Subjects"
                className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
              />
            ) : (
              <select
                className="w-full mt-1 px-3 py-2 border rounded"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, i) => (
                  <option key={i}>{sub}</option>
                ))}
              </select>
            )}
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold"
          >
            {loading ? "Please wait..." : "Submit Admission Form"}
          </button>

          {message && (
            <p className="text-center mt-3 font-semibold text-green-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Admission;
