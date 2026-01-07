import { useAdminStudents } from "../Admin/AdminStudentContext";

const FeesCompleted = () => {
  const { students, loading } = useAdminStudents();
  if (loading) return <p>Loading...</p>;

  const completedStudents = students.filter(
    (s) =>
      s.calculatedFees &&
      s.calculatedFees.remaining === 0 &&
      s.calculatedFees.totalPaid > 0
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Fees Completed / Advance
      </h2>

      {completedStudents.length === 0 ? (
        <p className="text-gray-500">
          No completed fees yet
        </p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Total Paid</th>
                <th className="p-3">Advance</th>
                <th className="p-3">Last Payment</th>
              </tr>
            </thead>
            <tbody>
              {completedStudents.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.className}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    ₹{s.calculatedFees.totalPaid}
                  </td>
                  <td className="p-3 text-blue-700">
                    ₹{s.calculatedFees.advanceBalance}
                  </td>
                  <td className="p-3 text-sm">
                    {s.calculatedFees.lastPayment
                      ? new Date(
                          s.calculatedFees.lastPayment.date
                        ).toLocaleDateString()
                      : "-"}
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

export default FeesCompleted;
