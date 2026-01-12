import { useEffect, useState } from "react";
import apiconfig from "../../config/apiconfig";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiconfig.STUDENT}/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDashboard(data.dashboard);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-6 text-center text-red-600">
        Unable to load dashboard
      </div>
    );
  }

  const { profile, fees } = dashboard;

  // ✅ DATE FORMAT: Day Month Year
  const admissionDate = new Date(profile.admissionDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <section className="pt-20 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-6">

        {/* ===== PAGE TITLE ===== */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <div className="w-24 h-[3px] bg-yellow-400 mx-auto mt-2"></div>
        </div>

        {/* ===== GRID WRAPPER ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ================= PROFILE CARD ================= */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Student Details
            </h2>

            <div className="space-y-2 text-sm md:text-base">
              <p>
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {profile.name}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {profile.email}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Class:</span>{" "}
                {profile.className}
              </p>

              <p>
                <span className="font-semibold text-gray-700">
                  Admission Status:
                </span>{" "}
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
                <span className="font-semibold text-gray-700">
                  Admission Date:
                </span>{" "}
                {admissionDate}
              </p>
            </div>
          </div>

          {/* ================= FEES CARD ================= */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Fees Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <p className="text-gray-600">Monthly Fee</p>
                <p className="font-semibold text-gray-800">
                  ₹{fees.monthlyFee}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Total Paid</p>
                <p className="font-semibold text-green-600">
                  ₹{fees.totalPaid}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Remaining Months</p>
                <p className="font-semibold text-gray-800">
                  {fees.remainingMonths}
                </p>
              </div>

              <div>
                <p className="text-gray-600">Remaining Amount</p>
                <p className="font-semibold text-red-600">
                  ₹{fees.remainingAmount}
                </p>
              </div>
            </div>

            {fees.lastPaidMonth && (
              <p className="mt-4 text-sm text-gray-600">
                Last paid till:{" "}
                <span className="font-semibold">
                  {fees.lastPaidMonth}
                </span>
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
