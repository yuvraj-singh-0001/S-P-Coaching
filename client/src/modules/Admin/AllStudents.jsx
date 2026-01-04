import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import StudentTable from "../Admin/StudentTable";
import StudentModal from "../Admin/StudentModal";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadStudents = async () => {
    const res = await axios.get(`${API.ADMIN}/students`, { withCredentials: true });
    setStudents(res.data.students);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await axios.delete(`${API.ADMIN}/students/${id}`, { withCredentials: true });
    loadStudents();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `${API.ADMIN}/students/status/${id}`,
      { status },
      { withCredentials: true }
    );
    // EMAIL WILL STILL SEND (backend)
    loadStudents();
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
          onRefresh={loadStudents}
        />
      )}
    </>
  );
};

export default AllStudents;
