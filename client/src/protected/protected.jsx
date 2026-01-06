import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/Admin/AdminAuthContext";

const ProtectedRoute = ({ children, allowRoles }) => {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Checking access...</p>;
  }

  // not logged in → login page
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // role not allowed
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
