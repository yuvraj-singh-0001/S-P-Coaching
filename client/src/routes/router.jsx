import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../protected/Protected";

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
import AdminLayout from "../components/layout/adminlayout/AdminLayout";
import Dashboard from "../modules/Admin/Dashboard";
import AllStudents from "../modules/Admin/AllStudents";
import PendingStudents from "../modules/Admin/PendingStudents";
import ApprovedStudents from "../modules/Admin/ApprovedStudents";
import RejectedStudents from "../modules/Admin/RejectedStudents";
import DueFees from "../modules/Admin/DueFees";
import AdminProfile from "../modules/Admin/AdminProfile";

import { AdminStudentProvider } from "../modules/Admin/AdminStudentContext";
import { AdminAuthProvider } from "../modules/Admin/AdminAuthContext";

/* ================= SCROLL HANDLER ================= */
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (
      path === "/about" ||
      path === "/courses" ||
      path === "/contact"
    ) {
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
    <>
      <ScrollToSection />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><Home /></Layout>} />

        <Route path="/fees" element={<Layout><Fees /></Layout>} />
        <Route path="/admission" element={<Layout><Admission /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN – PROTECTED (ADMIN ONLY) */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <ProtectedRoute allowRoles={["admin"]}>
                <AdminStudentProvider>
                  <AdminLayout />
                </AdminStudentProvider>
              </ProtectedRoute>
            </AdminAuthProvider>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="students/pending" element={<PendingStudents />} />
          <Route path="students/approved" element={<ApprovedStudents />} />
          <Route path="students/rejected" element={<RejectedStudents />} />
          <Route path="fees" element={<DueFees />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </>
  );
};

export default AppRouter;
