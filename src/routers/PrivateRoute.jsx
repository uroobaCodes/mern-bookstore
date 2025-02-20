import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuthStore();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default PrivateRoute;
