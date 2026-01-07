import {
  FaEye,
  FaTrash,
  FaCheck,
  FaTimes,
  FaRupeeSign
} from "react-icons/fa";

const StudentTable = ({
  students,
  onView,
  onDelete,
  onApprove,
  onReject,
  onUpdateFees // ✅ NEW
}) => {
  const showActions =
    onView || onDelete || onApprove || onReject || onUpdateFees;

  return (
    <div className="w-full overflow-x-auto bg-white rounded shadow">
      <table className="min-w-[900px] w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Status</th>
            {showActions && (
              <th className="p-3 text-left">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No students found
              </td>
            </tr>
          )}

          {students.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.className}</td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    s.admissionStatus === "Approved"
                      ? "bg-green-600"
                      : s.admissionStatus === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {s.admissionStatus}
                </span>
              </td>

              {showActions && (
                <td className="p-3 flex gap-2 flex-wrap">
                  {/* VIEW */}
                  {onView && (
                    <button
                      onClick={() => onView(s)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                      title="View Student"
                    >
                      <FaEye />
                    </button>
                  )}

                  {/* APPROVE */}
                  {onApprove && (
                    <button
                      onClick={() => onApprove(s._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      title="Approve Admission"
                    >
                      <FaCheck />
                    </button>
                  )}

                  {/* REJECT */}
                  {onReject && (
                    <button
                      onClick={() => onReject(s._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      title="Reject Admission"
                    >
                      <FaTimes />
                    </button>
                  )}

                  {/* 💜 UPDATE FEES */}
                  {onUpdateFees && (
                    <button
                      onClick={() => onUpdateFees(s)}
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                      title="Update Fees"
                    >
                      <FaRupeeSign />
                    </button>
                  )}

                  {/* DELETE */}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(s._id)}
                      className="bg-black text-white px-3 py-1 rounded"
                      title="Delete Student"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
