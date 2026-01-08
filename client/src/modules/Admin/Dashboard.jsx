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
      color: "bg-blue-600",
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
      color: "bg-green-600",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      path: "/admin/students/rejected",
      color: "bg-red-600",
    },
    {
      label: "Due Fees",
      value: dueFeesCount,
      path: "/admin/fees",
      color: "bg-purple-600",
    },
    {
      label: "Fees Completed",
      value: feesCompletedCount,
      path: "/admin/fees-completed",
      color: "bg-indigo-600",
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
            className={`${card.color} text-white p-5 rounded shadow cursor-pointer hover:opacity-90 transition`}
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* SEND NOTIFICATION */}
          <button
            onClick={() => navigate("/admin/notifications")}
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded shadow transition"
          >
            🔔 Send Notification
          </button>

          {/* MANAGE FEES */}
          <button
            onClick={() => navigate("/admin/fees")}
            className="bg-green-700 hover:bg-green-800 text-white py-3 rounded shadow transition"
          >
            💰 Manage Fees
          </button>

          {/* FEES COMPLETED */}
          <button
            onClick={() => navigate("/admin/fees-completed")}
            className="bg-gray-300 hover:bg-indigo-800 text-white py-3 rounded shadow transition"
          >
            ✅ Fees Completed
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
