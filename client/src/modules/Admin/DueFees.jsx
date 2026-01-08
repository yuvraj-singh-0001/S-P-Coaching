import { useAdminStudents } from "../Admin/AdminStudentContext";

const DueFees = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const dueStudents = students.filter(
    (s) =>
      s.calculatedFees &&
      s.calculatedFees.remaining > 0
  );

  const dueStudentsSorted = [...dueStudents].sort(
    (a, b) =>
      b.calculatedFees.remaining - a.calculatedFees.remaining
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Due Fees Students
      </h2>

      {dueStudentsSorted.length === 0 ? (
        <p className="text-gray-500">
          No students with due fees 🎉
        </p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Remaining</th>
                <th className="p-3 text-left">Months Due</th>
              </tr>
            </thead>
            <tbody>
              {dueStudentsSorted.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.className}</td>
                  <td className="p-3 font-bold text-red-600">
                    ₹{s.calculatedFees.remaining}
                  </td>
                  <td className="p-3 font-semibold">
                    {s.calculatedFees.dueMonths}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DueFees;
