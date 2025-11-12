import { Link, useNavigate } from "react-router";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWishlists from "../../hooks/useWishlists";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SingleBlogCard = ({ blog }) => {
  const [disableButton, setDisableButton] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [wishlists] = useWishlists();

  const addToWishlist = useMutation({
    mutationFn: (wishlistData) => {
      // Add new wishlist
      return axiosSecure.post(`/add-wishlist`, wishlistData);
    },
    onSuccess: async (data) => {
      toast.success("Post added to your wishlist");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Post already wishlisted!");
    },
  });

  const handleWishlist = async () => {
    try {
      if (!user) {
        return navigate("/login");
      }

      setDisableButton(true);

      const wishListData = {
        postId: blog._id,
        userEmail: user?.email,
        category: blog.category,
        title: blog.title,
        postCover: blog.coverImage,
      };

      // Add new post to the wishlist
      const response = await addToWishlist.mutateAsync(wishListData);
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (wishlists && wishlists.some((item) => item.postId === blog._id)) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [wishlists, blog._id, user?.email]);

  return (
    <div className="flex md:flex-row flex-col gap-5 overflow-hidden border md:h-[250px] relative transition-border duration-200 rounded-2xl blog-shadow dark:!blog-shadow-dark justify-between items-center">
      {/* Blog Image */}
      <Link to={`/single-blog/${blog?._id}`} className="flex-1 h-full w-full relative">
        <img src={blog?.coverImage} className="w-full h-full object-cover" alt="" />

        {/* Article Badge */}
        <CategoryBadge category={blog?.category} align={"left"} />
      </Link>
      {/* Blog Content */}
      <div className="flex flex-col flex-2 gap-3 items-center md:p-0 p-5">
        {/* Blog Title */}
        <div>
          <Link
            to={`/single-blog/${blog?._id}`}
            className="hover:underline cursor-pointer transition font-medium md:text-xl xl:text-2xl lg:text-[15px] text-[15px] text-left mt-3"
          >
            {blog?.title}
          </Link>
        </div>
        {/* Blog Description */}
        <div>
          <p className="text-sm text-left pr-3 md:text-[10px] xl:text-sm sm:text-[10px]">
            {blog?.excerpt}
          </p>
        </div>
        {/* Blog Actions */}
        <div className="flex flex-row  gap-3 self-start">
          {/* Wishlist Button */}
          <button
            className="btn btn-primary hover:btn-outline"
            onClick={handleWishlist}
            disabled={disableButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${disableButton === true ? "#fff" : "none"}`}
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
          <Link to={`/single-blog/${blog?._id}`} className="btn btn-outline btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
