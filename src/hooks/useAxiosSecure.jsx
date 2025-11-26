import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Allows sending cookies
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();

  // Side effects of the interceptor
  useEffect(() => {
    // Axios request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Axios response interceptors
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        if (err.status === 401 || err.status === 403) {
          // Logout the user
          handleLogout()
            .then(() => {
              // console.log("User logged out successfully!");
            })
            .catch((err) => {
              console.log(err);
            });
          // Toast
          toast.error("Forbidden access");

          // Clear token cookie
          // await axiosInstance.post("/logout");

          // Navigate the user to the login page
          navigate("/auth/login");
          //  console axios error
          console.log("Error caught on axios interceptor--->", err);

          return;
        }

        return Promise.reject(err);
      }
    );
  }, [handleLogout, navigate, user?.accessToken]);

  // Return axiosInstance
  return axiosInstance;
};

export default useAxiosSecure;
