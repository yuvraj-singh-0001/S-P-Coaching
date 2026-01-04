import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";

const ApprovedStudents = () => {
  const { students, loading, refreshStudents } = useAdminStudents();
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const approved = students.filter(
    (s) => s.admissionStatus === "Approved"
  );

  const rejectStudent = async (id) => {
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status: "Rejected" },
      { withCredentials: true }
    );
    refreshStudents();
    showMessage("Student rejected successfully");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Approved Students</h2>

      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <StudentTable
        students={approved}
        onReject={rejectStudent}
      />
    </>
  );
};

export default ApprovedStudents;
