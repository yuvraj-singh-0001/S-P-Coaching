const ProtectedRoute = ({ children }) => {
  // For now, no protection, just render children
  // Later, add authentication check here
  return children;
};

export default ProtectedRoute;