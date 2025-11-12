import { Link, Navigate, useNavigate } from "react-router";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import Skeleton from "react-loading-skeleton";
import "./ArticleTemplate.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "./../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useWishlists from "../../hooks/useWishlists";

const ArticleTemplate = ({ title, imageURL, id, category, isPending }) => {
  const [disableButton, setDisableButton] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [wishlists] = useWishlists();

  const addToWishlist = useMutation({
    mutationFn: (wishlistData) => {
      return axiosSecure.post(`/add-wishlist`, wishlistData);
    },
    onSuccess: (data) => {
      toast.success("Post added to your wishlist");
      console.log(data);
      queryClient.invalidateQueries(["wishlists"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleWishlist = () => {
    if (!user) {
      return navigate("/login");
    }

    setDisableButton(true);

    const wishListData = {
      postId: id,
      userEmail: user?.email,
      category,
      title,
      postCover: imageURL,
    };

    // Add new post to the wishlist
    addToWishlist.mutate(wishListData);
  };

  useEffect(() => {
    if (wishlists && wishlists.some((item) => item.postId === id)) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [wishlists, id, user?.email]);

  if (isPending) return <Skeleton className="h-full max-h-full" />;
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
          className="md:text-sm lg:text-lg text-sm absolute bottom-0 left-0 text-white text-shadow-base-300 font-medium hover:text-red-400 transform duration-500 p-5 hover:underline cursor-pointer"
        >
          {title}
        </Link>
        {/* Wishlist Button */}
        <button
          className={`btn btn-primary hover:btn-outline absolute right-0 top-12 transform wishlist-button transition duration-200`}
          title="Add to Wishlist"
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
        </button>
      </div>
    </div>
  );
};

export default ArticleTemplate;
