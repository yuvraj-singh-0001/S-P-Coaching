import { useAdminStudents } from "../Admin/AdminStudentContext";

const DueFees = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const dueStudents = students.filter(s => s.fees?.remaining > 0);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Due Fees</h2>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {dueStudents.map(s => (
              <tr key={s._id} className="border-b">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.className}</td>
                <td className="p-3 font-bold text-red-600">
                  ₹{s.fees.remaining}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DueFees;
