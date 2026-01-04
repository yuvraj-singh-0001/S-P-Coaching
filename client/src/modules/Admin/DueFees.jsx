import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const DueFees = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${API.ADMIN}/students`).then(res => {
      const due = res.data.students.filter(
        s => s.fees && s.fees.remaining > 0
      );
      setStudents(due);
    });
  }, []);

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
            {students.map(s => (
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
