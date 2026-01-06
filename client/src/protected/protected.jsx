import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/Admin/AdminAuthContext";

/**
 * allowRoles = ["admin"]  → sirf admin
 * allowRoles = undefined → koi bhi logged-in user
 */
const ProtectedRoute = ({ children, allowRoles }) => {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Checking access...</p>;
  }

  // 🔐 login required
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 🔐 role check (only if provided)
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
