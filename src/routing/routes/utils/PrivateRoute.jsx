import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

export const PrivateRoute = () => {
  const {authState} = useAuth();

  if (authState === false) return <Navigate to="/login" />;

  return <Outlet />;
};
