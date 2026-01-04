import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const StudentTable = ({
  students,
  onView,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Class</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.className}</td>

              <td className="p-3">
                <span className={`px-3 py-1 rounded text-white ${
                  s.admissionStatus === "Approved"
                    ? "bg-green-600"
                    : s.admissionStatus === "Rejected"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}>
                  {s.admissionStatus}
                </span>
              </td>

              <td className="p-3 flex gap-2">
                <button onClick={() => onView(s)} className="bg-blue-600 text-white px-3 py-1 rounded">
                  <FaEye />
                </button>

                <button onClick={() => onStatusChange(s._id, "Approved")} className="bg-green-600 text-white px-3 py-1 rounded">
                  <FaCheck />
                </button>

                <button onClick={() => onStatusChange(s._id, "Rejected")} className="bg-red-600 text-white px-3 py-1 rounded">
                  <FaTimes />
                </button>

                <button onClick={() => onDelete(s._id)} className="bg-black text-white px-3 py-1 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
