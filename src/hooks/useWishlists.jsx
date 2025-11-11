import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

// Fetching wishlists
const useWishlists = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlist/${user?.email}`);
      return data;
    },

    enabled: !!user?.email,
  });

  return data;
};

export default useWishlists;
