import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const StudentModal = ({ student, onClose, onRefresh }) => {
  const [form, setForm] = useState({ ...student });
  const [loading, setLoading] = useState(false);

  if (!student) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE STUDENT
  const saveChanges = async () => {
    setLoading(true);
    await axios.put(
      `${API.ADMIN}/students/${student._id}`,
      form,
      { withCredentials: true }
    );
    setLoading(false);
    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded shadow p-6 relative">

        <h2 className="text-xl font-bold mb-4">
          Student Details
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
          <input name="className" value={form.className} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>

          <button
            onClick={saveChanges}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
