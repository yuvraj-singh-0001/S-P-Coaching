import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

/* 🔥 SAME COURSES AS FEES PAGE */
const coursesList = [
  "Class 9th & 10th (All Subjects)",
  "Class 11th & 12th (Per Subject)",
  "B.Sc (Per Subject)",
  "ITI (Per Subject)",
  "Polytechnic (Per Subject)"
];

const AdminNotifications = () => {
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    setMessage("");

    if (!type) {
      setMessage("Please select notification type");
      return;
    }

    if (type === "holiday" && !fromDate) {
      setMessage("Please select holiday date");
      return;
    }

    if (type === "test" && !course) {
      setMessage("Please select course");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API.ADMIN}/notifications/send`,
        {
          type,
          fromDate,
          toDate,
          course
        },
        { withCredentials: true }
      );

      setMessage("Notification sent successfully");

      // 🔄 optional reset
      setFromDate("");
      setToDate("");
      setCourse("");

    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
        "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Send Notification
      </h2>

      {/* TYPE SELECT */}
      <select
        className="border p-2 w-full mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="holiday">Holiday</option>
        <option value="dueFees">Due Fees</option>
        <option value="test">Test</option>
      </select>

      {/* HOLIDAY */}
      {type === "holiday" && (
        <>
          <input
            type="date"
            className="border p-2 w-full mb-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 w-full mb-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </>
      )}

      {/* TEST – 🔥 DROPDOWN FIX */}
      {type === "test" && (
        <select
          className="border p-2 w-full mb-2"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {coursesList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      {/* SEND */}
      <button
        onClick={sendNotification}
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded w-full transition"
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>

      {/* MESSAGE */}
      {message && (
        <p className="mt-3 text-center font-semibold text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminNotifications;
