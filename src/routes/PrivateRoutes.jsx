import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user?.email) {
    return children;
  }

  return <Navigate to={`/login`} state={location?.pathname}></Navigate>;
};

export default PrivateRoutes;
