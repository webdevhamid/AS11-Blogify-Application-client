import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

// Custom Auth Hook
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
