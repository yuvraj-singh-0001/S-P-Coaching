import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";

const RejectedStudents = () => {
  const { students, loading, refreshStudents } = useAdminStudents();
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const rejected = students.filter(
    (s) => s.admissionStatus === "Rejected"
  );

  const approveStudent = async (id) => {
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status: "Approved" },
      { withCredentials: true }
    );
    refreshStudents();
    showMessage("Student approved successfully");
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await axios.delete(`${API.ADMIN}/students/${id}`, {
      withCredentials: true
    });
    refreshStudents();
    showMessage("Student deleted successfully");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Rejected Students</h2>

      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <StudentTable
        students={rejected}
        onApprove={approveStudent}
        onDelete={deleteStudent}
      />
    </>
  );
};

export default RejectedStudents;
