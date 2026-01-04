import { useNavigate } from "react-router-dom";
import { useAdminStudents } from "../Admin/AdminStudentContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, loading } = useAdminStudents();

  if (loading) return <p>Loading dashboard...</p>;

  const stats = {
    total: students.length,
    pending: students.filter(s => s.admissionStatus === "Pending").length,
    approved: students.filter(s => s.admissionStatus === "Approved").length,
    rejected: students.filter(s => s.admissionStatus === "Rejected").length,
    dueFees: students.filter(s => s.fees?.remaining > 0).length
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card title="Total Students" value={stats.total} color="bg-blue-600" />
        <Card title="Pending" value={stats.pending} color="bg-yellow-500" />
        <Card title="Approved" value={stats.approved} color="bg-green-600" />
        <Card title="Rejected" value={stats.rejected} color="bg-red-600" />

        <div
          onClick={() => navigate("/admin/fees")}
          className="bg-purple-600 text-white p-6 rounded shadow cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-lg">Due Fees</h3>
          <p className="text-3xl font-bold">{stats.dueFees}</p>
          <p className="text-sm mt-1 underline">View Details</p>
        </div>
      </div>
    </>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded shadow`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
