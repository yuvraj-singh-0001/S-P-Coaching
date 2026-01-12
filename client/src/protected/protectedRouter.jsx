import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/Admin/AdminAuthContext";

const ProtectedRoute = ({ children, allowRoles }) => {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    if (location.pathname === "/login") {
      return children;
    }
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
