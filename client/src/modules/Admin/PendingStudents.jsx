import { useAdminStudents } from "./AdminStudentContext";
import StudentTable from "./StudentTable";

const PendingStudents = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const pending = students.filter(
    (s) => s.admissionStatus === "Pending"
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Pending Students</h2>
      <StudentTable students={pending} hideActions />
    </>
  );
};

export default PendingStudents;
