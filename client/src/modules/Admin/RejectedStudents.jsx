import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";

const RejectedStudents = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const rejected = students.filter(
    (s) => s.admissionStatus === "Rejected"
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Rejected Students</h2>
      <StudentTable students={rejected} hideActions />
    </>
  );
};

export default RejectedStudents;
