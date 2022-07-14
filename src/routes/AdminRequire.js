import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AdminRequire({ children }) {
  const auth = useAuth()
  console.log("auth", auth)
  const { user } = auth;
  const location = useLocation();
  if(user.role !== "admin"){
    return <Navigate to="/login" state={{from: location}} replace/>
  }
  return children;
}

export default AdminRequire;