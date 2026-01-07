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

  // 🔥 DUE FEES (remaining > 0)
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
      (s.calculatedFees.totalPaid > 0)
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
      path: "/admin/fees", // 👈 due list
      color: "bg-purple-600",
    },
    {
      label: "Fees Completed",
      value: feesCompletedCount,
      path: "/admin/fees-completed", // 👈 completed + advance
      color: "bg-indigo-600",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

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
    </>
  );
};

export default Dashboard;
