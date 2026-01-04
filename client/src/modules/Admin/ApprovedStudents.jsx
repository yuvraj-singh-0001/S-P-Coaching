import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";
import StudentTable from "../Admin/StudentTable";

const ApprovedStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API.ADMIN}/students?status=Approved`)
      .then(res => setStudents(res.data.students));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Approved Students</h2>
      <StudentTable students={students} onDelete={()=>{}} onView={()=>{}} />
    </>
  );
};

export default ApprovedStudents;
