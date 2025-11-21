import { Link, useNavigate } from "react-router";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import TruncateText from "../../utility/TruncateText";

const SingleBlogCard = ({ blog }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check if a specific post is wishListed
  // const { data: wishlistCheck, isLoading } = useQuery({
  //   queryKey: ["wishlist-check", blog?._id, user?.email],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`/wishlist/${blog?._id}`);
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     console.log(data.exists);
  //   },
  //   enabled: !!user?.email,
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
        queryKey: ["wishlist-check", blog?._id, user?.email],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "something went wrong");
      // setDisableButton(false);
    },
  });

  // wishlist click handler
  const handleWishlist = () => {
    if (!user) {
      return navigate("/login");
    }

    // setDisableButton(true);

    const wishListData = {
      postId: blog?._id,
      userEmail: user?.email,
      category: blog?.category,
      title: blog?.title,
      postCover: blog?.coverImage,
    };
    // Add the post to the wishlist
    addToWishlist.mutate(wishListData);
  };

  // Disable button state
  // const buttonDisabled = isLoading || wishlistCheck?.exists || authLoading;

  return (
    <div className="flex flex-col gap-5 overflow-hidden border relative transition-border duration-200 rounded-2xl blog-shadow dark:!blog-shadow-dark max-h-[415px] min-h-[350px]">
      {/* Blog Image */}
      <Link to={`/single-blog/${blog?._id}`} className="flex-1 h-[180px] w-full relative">
        <img src={blog?.coverImage} className="w-full h-full object-cover" alt="" />

        {/* Article Badge */}
        <CategoryBadge category={blog?.category} align={"left"} />
      </Link>
      {/* Blog Content */}
      <div className="flex flex-col gap-2 items-center flex-2 p-3">
        {/* Blog Title */}
        <div>
          <Link
            to={`/single-blog/${blog?._id}`}
            className="hover:underline cursor-pointer transition font-medium text-lg"
          >
            {<TruncateText text={blog?.title} />}
          </Link>
        </div>
        {/* Blog Description */}
        <div>
          <p className="text-sm text-left pr-3 md:text-[10px] xl:text-sm sm:text-[10px]">
            {<TruncateText text={blog?.excerpt} maxLength={110} />}
          </p>
        </div>
        {/* Blog Actions */}
        <div className="flex lg:flex-row sm:flex-wrap justify-center sm:flex-col gap-3 self-start mt-auto">
          {/* Wishlist Button */}
          <button
            className="btn btn-primary hover:btn-outline lg:btn-md sm:btn-xs"
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
            Add to Wishlist
          </button>
          {/* Details Button */}
          <Link
            to={`/single-blog/${blog?._id}`}
            className="btn btn-outline btn-primary lg:btn-md sm:btn-xs"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
