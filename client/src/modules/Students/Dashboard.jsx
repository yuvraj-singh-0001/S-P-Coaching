import { useEffect, useState } from "react";
import apiconfig from "../../config/apiconfig";

const JOIN_CLASS_URL =
  "https://wayground.com/join?source=marketing_page_nav_btn&feat=school-plan-quote&pageSource=marketing";

const JIO_CLASS_EMAIL = "spcoachingclasses888@gmail.com";

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

  const handleJoinClass = () => {
    window.location.href = JOIN_CLASS_URL; // same tab
  };

  const handleJioClassInfo = () => {
    window.location.href = `mailto:${JIO_CLASS_EMAIL}?subject=Jio%20Class%20Information%20Request`;
  };

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
    <section className="pt-24 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-6">

          {/* ===== PAGE TITLE ===== */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Student Dashboard
              </h1>
              <div className="w-24 h-[3px] bg-yellow-400 mt-2 md:ml-0 mx-auto md:mx-0"></div>
              <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl">
                Here you can see your basic details and your fee status in one place.
                This page helps you track how much fee you have paid and how much is left.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <button
                onClick={handleJoinClass}
                className="px-3 py-1.5 text-sm rounded bg-[#0C4A8B] text-white font-semibold hover:bg-blue-800 transition"
              >
                Join Online Jio Class
              </button>
              <button
                onClick={handleJioClassInfo}
                className="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Jio Class Information
              </button>
            </div>
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
                <p className="text-gray-600">
                  Remaining Months (including current month)
                </p>
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
