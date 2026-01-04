import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";

const ApprovedStudents = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const approved = students.filter(
    (s) => s.admissionStatus === "Approved"
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Approved Students</h2>
      <StudentTable students={approved} hideActions />
    </>
  );
};

export default ApprovedStudents;
