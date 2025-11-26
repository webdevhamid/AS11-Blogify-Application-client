import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTheme from "../../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import IconTitle from "../IconTitle/IconTitle";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";

const PoliticsSection = () => {
  const axiosSecure = useAxiosSecure();
  const { skeletonTheme } = useTheme();

  const fetchRecentBlogs = async () => {
    const { data } = await axiosSecure.get(`/blogs?categoryType=Politics&limit=8`);
    return data;
  };

  const { data: recentBlogs, isPending } = useQuery({
    queryKey: ["political-blogs"],
    queryFn: fetchRecentBlogs,
  });

  return (
    <div className="pb-20">
      <IconTitle title={`International Political Affairs`} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <SkeletonTheme
          baseColor={skeletonTheme.baseColor}
          highlightColor={skeletonTheme.highlightColor}
        >
          {isPending
            ? [...Array(8)].map((_, i) => <Skeleton key={i} height={315} />)
            : recentBlogs?.map((blog) => <SingleBlogCard key={blog?._id} blog={blog} />)}
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default PoliticsSection;
