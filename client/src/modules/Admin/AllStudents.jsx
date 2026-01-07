import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import UpdateFeesModal from "./UpdateFeesModal"; // ✅ NEW

const AllStudents = () => {
  const { students, loading, refreshStudents } = useAdminStudents();

  const [selectedStudent, setSelectedStudent] = useState(null); // view/edit
  const [feesStudent, setFeesStudent] = useState(null);         // update fees

  const [loadingAction, setLoadingAction] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading students...</p>;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // ================= APPROVE =================
  const approveStudent = async (id) => {
    setLoadingAction(true);
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status: "Approved" },
      { withCredentials: true }
    );
    setLoadingAction(false);
    refreshStudents();
    showMessage("Student approved successfully");
  };

  // ================= REJECT =================
  const rejectStudent = async (id) => {
    setLoadingAction(true);
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status: "Rejected" },
      { withCredentials: true }
    );
    setLoadingAction(false);
    refreshStudents();
    showMessage("Student rejected successfully");
  };

  // ================= DELETE =================
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    setLoadingAction(true);
    await axios.delete(`${API.ADMIN}/students/${id}`, {
      withCredentials: true
    });
    setLoadingAction(false);
    refreshStudents();
    showMessage("Student deleted successfully");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        All Students
      </h2>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700">
          {message}
        </div>
      )}

      {/* ACTION LOADING INFO */}
      {loadingAction && (
        <p className="mb-3 text-sm text-blue-600">
          Processing action...
        </p>
      )}

      {/* STUDENT TABLE */}
      <StudentTable
        students={students}
        onView={setSelectedStudent}
        onApprove={approveStudent}
        onReject={rejectStudent}
        onDelete={deleteStudent}
        onUpdateFees={setFeesStudent} // ✅ NEW ACTION
      />

      {/* VIEW / EDIT MODAL */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onRefresh={refreshStudents}
          onSuccess={showMessage}
        />
      )}

      {/* UPDATE FEES MODAL */}
      {feesStudent && (
        <UpdateFeesModal
          student={feesStudent}
          onClose={() => setFeesStudent(null)}
          onSuccess={(msg) => {
            showMessage(msg);
            refreshStudents(); // ✅ single refresh after fees update
          }}
        />
      )}
    </>
  );
};

export default AllStudents;
