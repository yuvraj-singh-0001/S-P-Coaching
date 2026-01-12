import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/Admin/AdminAuthContext";

const ProtectedRoute = ({ children, allowRoles }) => {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) return null;

  // 🔐 Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 🔒 Role based protection
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
