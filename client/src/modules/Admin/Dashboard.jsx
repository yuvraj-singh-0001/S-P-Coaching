import { useNavigate } from "react-router-dom";
import { useAdminStudents } from "../Admin/AdminStudentContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, loading } = useAdminStudents();

  if (loading) return <p>Loading dashboard...</p>;

  const stats = [
    { label: "All Students", value: students.length, path: "/admin/students", color: "bg-blue-600" },
    { label: "Pending", value: students.filter(s => s.admissionStatus === "Pending").length, path: "/admin/students/pending", color: "bg-yellow-500" },
    { label: "Approved", value: students.filter(s => s.admissionStatus === "Approved").length, path: "/admin/students/approved", color: "bg-green-600" },
    { label: "Rejected", value: students.filter(s => s.admissionStatus === "Rejected").length, path: "/admin/students/rejected", color: "bg-red-600" },
    { label: "Due Fees", value: students.filter(s => s.fees?.remaining > 0).length, path: "/admin/fees", color: "bg-purple-600" }
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(card => (
          <div
            key={card.label}
            onClick={() => navigate(card.path)}
            className={`${card.color} text-white p-5 rounded shadow cursor-pointer hover:opacity-90`}
          >
            <p className="text-sm">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
