import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true, // Allows sending cookies
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  // Side effects of the interceptor
  useEffect(() => {
    // Axios response interceptors
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        // Check if the promise rejected because of the status code of 401 or 403
        if (err.status === 401 || err.status === 403) {
          // Logout the current user
          const response = await handleLogout();
          console.log(response);

          toast.error("Forbidden Access!");

          // Navigate the user to the login page
          navigate("/login");
        }
      }
    );
  }, [handleLogout, navigate]);
  // Return axiosInstance
  return axiosInstance;
};

export default useAxiosSecure;
