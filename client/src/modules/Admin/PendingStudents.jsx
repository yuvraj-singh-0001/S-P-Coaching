import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import StudentTable from "../Admin/StudentTable";

const PendingStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API.ADMIN}/students?status=Pending`)
      .then(res => setStudents(res.data.students));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Pending Admissions</h2>
      <StudentTable students={students} onDelete={()=>{}} onView={()=>{}} />
    </>
  );
};

export default PendingStudents;
