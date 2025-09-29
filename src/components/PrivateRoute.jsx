import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");

  if (!token) {
    // Pas de token → redirection vers login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
