import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 
const RestrictPath = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default RestrictPath;