import { useState } from "react";
import axios from "axios";
import API from "../../config/apiconfig";

const UpdateFeesModal = ({ student, onClose, onSuccess }) => {
  const [monthsCount, setMonthsCount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fees = student.calculatedFees || {};
  const remaining = Number(fees.remaining || 0);
  const advance = Number(fees.advanceBalance || 0);

  // 🔥 LAST PAID INFO (SAFE)
  const history = student.fees?.history || [];
  const lastPayment =
    history.length > 0 ? history[history.length - 1] : null;

  const submit = async () => {
    setError("");

    if (!monthsCount || monthsCount <= 0) {
      setError("Enter valid number of months");
      return;
    }

    if (!amount || amount <= 0) {
      setError("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${API.ADMIN}/students/fees/${student._id}`,
        {
          monthsCount: Number(monthsCount),
          amount: Number(amount),
        },
        { withCredentials: true }
      );

      onSuccess("Fees updated successfully");
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to update fees"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-3 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="p-4 border-b font-bold">
          Update Fees
        </div>

        {/* BODY */}
        <div className="p-4 space-y-3 text-sm">
          <p><b>Name:</b> {student.name}</p>
          <p><b>Class:</b> {student.className}</p>
          <p><b>Monthly Fee:</b> ₹{fees.monthlyFee}</p>

          {/* 🔥 LAST PAID DISPLAY */}
          {lastPayment ? (
            <p className="text-green-700 font-semibold">
              Fees Paid Till:{" "}
              {lastPayment.fromMonth} → {lastPayment.toMonth}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              No fees paid yet
            </p>
          )}

          <p className="text-red-600">
            <b>Remaining:</b> ₹{remaining}
          </p>

          {advance > 0 && (
            <p className="text-blue-600 font-semibold">
              Advance Balance: ₹{advance}
            </p>
          )}

          {/* INPUTS */}
          <input
            type="number"
            placeholder="Number of months to pay"
            value={monthsCount}
            onChange={(e) => setMonthsCount(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Paid amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Fees"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateFeesModal;
