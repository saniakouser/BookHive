import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 
const RestrictPath = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if(token && !user){
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default RestrictPath;