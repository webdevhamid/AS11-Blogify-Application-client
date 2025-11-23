import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

// Fetching wishlists
const useWishlists = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlists/${user?.email}`);
      return data;
    },

    enabled: !!user?.email, // prevent auto-run
  });

  return [data, isPending];
};

export default useWishlists;
