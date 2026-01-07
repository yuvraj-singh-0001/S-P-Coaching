import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const UpdateFeesModal = ({ student, onClose, onSuccess }) => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!month || !amount) return;

    setLoading(true);
    await axios.put(
       `${API.ADMIN}/students/fees/${student._id}`,
      { month, amount },
      { withCredentials: true }
    );
    setLoading(false);

    onSuccess("Fees updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h3 className="text-xl font-bold mb-3">Update Fees</h3>

        <p><b>Name:</b> {student.name}</p>
        <p><b>Class:</b> {student.className}</p>
        <p><b>Total Fees:</b> ₹{student.fees.total}</p>
        <p><b>Paid:</b> ₹{student.fees.paid}</p>
        <p className="mb-3">
          <b>Remaining:</b> ₹{student.fees.remaining}
        </p>

        <input
          placeholder="Month (e.g. Jan 2026)"
          className="border p-2 w-full mb-2"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount Paid"
          className="border p-2 w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeesModal;
