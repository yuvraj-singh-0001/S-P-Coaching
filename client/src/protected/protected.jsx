import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../modules/Admin/AdminAuthContext";

/**
 * allowRoles = ["admin"]  → sirf admin allow
 * allowRoles = ["student"] → sirf student allow
 * allowRoles = undefined   → koi bhi logged-in user
 */
const ProtectedRoute = ({ children, allowRoles }) => {
  const { user, loading } = useAdminAuth();

  // jab tak /me API se user load ho raha hai
  if (loading) {
    return <p className="text-center mt-10">Checking access...</p>;
  }

  // login hi nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role allowed nahi
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
