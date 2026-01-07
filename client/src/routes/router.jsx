import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../protected/protected.jsx";

/* PUBLIC */
import Home from "../pages/Home";
import Fees from "../modules/Students/Fees";
import Admission from "../modules/Students/Admission";
import Teachers from "../pages/Teachers";
import Resources from "../pages/Resources";

/* AUTH */
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";

/* ADMIN */
import AdminLayout from "../components/adminlayout/AdminLayout";
import Dashboard from "../modules/Admin/Dashboard";
import AllStudents from "../modules/Admin/AllStudents";
import PendingStudents from "../modules/Admin/PendingStudents";
import ApprovedStudents from "../modules/Admin/ApprovedStudents";
import RejectedStudents from "../modules/Admin/RejectedStudents";
import DueFees from "../modules/Admin/DueFees";
import AdminProfile from "../modules/Admin/AdminProfile";
import FeesCompleted from "../modules/Admin/FeesCompleted";
import { AdminStudentProvider } from "../modules/Admin/AdminStudentContext";
import { AdminAuthProvider } from "../modules/Admin/AdminAuthContext";
import AdminNotify from "../modules/Admin/AdminNotifications";

/* ================= SCROLL HANDLER ================= */
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/about" || path === "/courses" || path === "/contact") {
      const id = path.replace("/", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return null;
};

/* ================= ROUTER ================= */
const AppRouter = () => {
  return (
    <AdminAuthProvider>
      <ScrollToSection />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><Home /></Layout>} />

        <Route path="/fees" element={<Layout><Fees /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= ADMISSION (LOGIN REQUIRED) ================= */}
        <Route
          path="/admission"
          element={
            <ProtectedRoute>
              <Layout><Admission /></Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN (ADMIN ONLY) ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowRoles={["admin"]}>
              <AdminStudentProvider>
                <AdminLayout />
              </AdminStudentProvider>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="students/pending" element={<PendingStudents />} />
          <Route path="students/approved" element={<ApprovedStudents />} />
          <Route path="students/rejected" element={<RejectedStudents />} />
          <Route path="fees" element={<DueFees />} />
          <Route path="fees-completed" element={<FeesCompleted />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="/admin/notifications" element={<AdminNotify />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AppRouter;
