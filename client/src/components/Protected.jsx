import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AUth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
