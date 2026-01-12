import { useEffect, useState } from "react";
import apiconfig from "../../config/apiconfig";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiconfig.STUDENT}/dashboard`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDashboard(data.dashboard);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4">Loading dashboard...</p>;
  }

  if (!dashboard) {
    return <p className="p-4 text-red-500">Unable to load dashboard</p>;
  }

  const { profile, fees } = dashboard;

  return (
    <div className="p-4 space-y-6">

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-bold mb-3">Student Details</h2>
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Class:</b> {profile.className}</p>
        <p>
          <b>Status:</b>{" "}
          <span
            className={
              profile.admissionStatus === "Approved"
                ? "text-green-600 font-semibold"
                : profile.admissionStatus === "Pending"
                ? "text-yellow-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {profile.admissionStatus}
          </span>
        </p>
        <p>
          <b>Admission Date:</b>{" "}
          {new Date(profile.admissionDate).toLocaleDateString()}
        </p>
      </div>

      {/* ================= FEES CARD ================= */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-bold mb-3">Fees Summary</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p><b>Monthly Fee:</b> ₹{fees.monthlyFee}</p>
          <p><b>Total Paid:</b> ₹{fees.totalPaid}</p>
          <p><b>Remaining Months:</b> {fees.remainingMonths}</p>
          <p className="text-red-600 font-semibold">
            <b>Remaining Amount:</b> ₹{fees.remainingAmount}
          </p>
        </div>

        {fees.lastPaidMonth && (
          <p className="mt-3 text-sm text-gray-600">
            Last paid till: <b>{fees.lastPaidMonth}</b>
          </p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
