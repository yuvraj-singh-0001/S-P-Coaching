import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import { useAdminStudents } from "../Admin/AdminStudentContext";

const AllStudents = () => {
  const { students, loading, refreshStudents } = useAdminStudents();
  const [selected, setSelected] = useState(null);

  if (loading) return <p>Loading students...</p>;

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await axios.delete(`${API.ADMIN}/students/${id}`, {
      withCredentials: true
    });
    refreshStudents();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status },
      { withCredentials: true }
    );
    refreshStudents();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">All Students</h2>

      <StudentTable
        students={students}
        onView={setSelected}
        onDelete={deleteStudent}
        onStatusChange={updateStatus}
      />

      {selected && (
        <StudentModal
          student={selected}
          onClose={() => setSelected(null)}
          onRefresh={refreshStudents}
        />
      )}
    </>
  );
};

export default AllStudents;
