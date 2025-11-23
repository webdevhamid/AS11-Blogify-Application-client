import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user?.email) {
    return children;
  }

  return <Navigate to={`/auth/login`} state={location?.pathname}></Navigate>;
};

export default PrivateRoutes;
