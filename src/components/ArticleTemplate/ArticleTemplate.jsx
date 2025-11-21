import { Link, useNavigate } from "react-router";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import "./ArticleTemplate.css";
import toast from "react-hot-toast";
import useAuth from "./../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ArticleTemplate = ({ title, imageURL, id, category, featuredBlog }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check if a specific post is wishListed
  // const { data: wishlistCheck, isLoading } = useQuery({
  //   queryKey: ["wishlist-check", id, user?.email],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`/wishlist/${id}`);
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     console.log(data.exists);
  //   },
  //   enabled: !authLoading && !!user?.email,
  // });

  // Mutation to add wishlist
  const addToWishlist = useMutation({
    mutationFn: (wishlistData) => {
      return axiosSecure.post(`/add-wishlist`, wishlistData);
    },
    onSuccess: (data) => {
      toast.success("Added to wishlist");
      // setDisableButton(true);
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["wishlist-check", id, user?.email],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "something went wrong");
      // setDisableButton(false);
    },
  });

  // Disable button state
  // const buttonDisabled = isLoading || wishlistCheck?.exists || authLoading;

  // wishlist click handler
  const handleWishlist = () => {
    if (!user) {
      return navigate("/login");
    }

    // setDisableButton(true);

    const wishListData = {
      postId: id,
      userEmail: user?.email,
      category,
      title,
      postCover: imageURL,
    };
    // Add the post to the wishlist
    addToWishlist.mutate(wishListData);
  };

  return (
    <div
      className={`relative overflow-hidden bg-center bg-cover w-full max-h-full article-template z-10`}
      style={{ backgroundImage: `url(${imageURL})` }}
    >
      {/* overlay */}
      <div className="bg-[rgba(30,30,30,0.4)] hover:bg-[rgba(30,30,30,0.2)] transform duration-1000 absolute w-full h-full"></div>

      {/* Article Badge */}
      <CategoryBadge category={category} />

      {/* Article Content */}
      <div>
        <Link
          to={`/single-blog/${id}`}
          className={`md:text-sm lg:text-lg sm:text-[14px] text-sm absolute bottom-0 left-0 text-white text-shadow-base-300 font-medium hover:text-red-400 transform duration-500 p-2 sm:p-5 hover:underline cursor-pointer ${
            featuredBlog && "lg:!text-3xl md:!text-2xl !text-xl"
          }`}
        >
          {title}
        </Link>
        {/* Wishlist Button */}
        <button
          className={`btn btn-primary hover:btn-outline absolute right-0 top-12 transform wishlist-button transition duration-200`}
          title="Add to Wishlist"
          onClick={handleWishlist}
          // disabled={buttonDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // fill={`${buttonDisabled === true ? "#fff" : "none"}`}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ArticleTemplate;
