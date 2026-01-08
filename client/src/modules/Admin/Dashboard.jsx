import { useNavigate } from "react-router-dom";
import { useAdminStudents } from "../Admin/AdminStudentContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, loading } = useAdminStudents();

  if (loading) return <p>Loading dashboard...</p>;

  // ================= SAFE CALCULATIONS =================
  const totalStudents = students.length;

  const pendingCount = students.filter(
    (s) => s.admissionStatus === "Pending"
  ).length;

  const approvedCount = students.filter(
    (s) => s.admissionStatus === "Approved"
  ).length;

  const rejectedCount = students.filter(
    (s) => s.admissionStatus === "Rejected"
  ).length;

  // 🔥 DUE FEES
  const dueFeesCount = students.filter(
    (s) =>
      s.calculatedFees &&
      s.calculatedFees.remaining > 0
  ).length;

  // 🔥 COMPLETED + ADVANCE
  const feesCompletedCount = students.filter(
    (s) =>
      s.calculatedFees &&
      s.calculatedFees.remaining === 0 &&
      s.calculatedFees.totalPaid > 0
  ).length;

  // ================= DASHBOARD CARDS =================
  const stats = [
    {
      label: "All Students",
      value: totalStudents,
      path: "/admin/students",
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: pendingCount,
      path: "/admin/students/pending",
      color: "bg-yellow-500",
    },
    {
      label: "Approved",
      value: approvedCount,
      path: "/admin/students/approved",
      color: "bg-green-500",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      path: "/admin/students/rejected",
      color: "bg-red-500",
    },
    {
      label: "Due Fees",
      value: dueFeesCount,
      path: "/admin/fees",
      color: "bg-purple-500",
    },
    {
      label: "Fees Completed",
      value: feesCompletedCount,
      path: "/admin/fees-completed",
      color: "bg-indigo-500",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((card) => (
          <div
            key={card.label}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white p-5 rounded shadow-xl cursor-pointer hover:opacity-90 transition hover:shadow-2xl hover:scale-105`}
          >
            <p className="text-sm">{card.label}</p>
            <p className="text-2xl font-bold">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* SEND NOTIFICATION */}
          <button
            onClick={() => navigate("/admin/notifications")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded shadow transition"
          >
            🔔 Send Notification
          </button>

          {/* MANAGE FEES */}
          <button
            onClick={() => navigate("/admin/fees")}
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded shadow transition"
          >
            💰 Manage Fees
          </button>

          {/* FEES COMPLETED */}
          <button
            onClick={() => navigate("/admin/fees-completed")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded shadow transition"
          >
            ✅ Fees Completed
          </button>

          {/* CREATE TEST / ASSIGNMENT (EXTERNAL – SAME TAB) */}
          <button
            onClick={() => {
              window.location.href =
                "https://wayground.com/admin?tab=create";
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded shadow transition"
          >
            📝 Create Test / Assignment
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
