import IconTitle from "../IconTitle/IconTitle";
import ArticleTemplate from "../ArticleTemplate/ArticleTemplate";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SingleBlogCard from "../SingleBlogCard/SingleBlogCard";

const RecentPosts = () => {
  const axiosSecure = useAxiosSecure();

  const fetchRecentBlogs = async () => {
    const { data } = await axiosSecure.get(`/blogs?recentPosts=true&limitQuery=true`);
    return data;
  };

  const { data: recentBlogs, isPending } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: fetchRecentBlogs,
  });

  return (
    <div className="py-20">
      <IconTitle title={`Recent Posts`} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {/* {isPending
          ? [...Array(6)].map((_, i) => <Skeleton key={i} height={315} />)
          : recentBlogs?.map((blog) => (
              <ArticleTemplate
                key={blog._id}
                id={blog._id}
                title={blog.title}
                imageURL={blog.coverImage}
                category={blog.category}
                isPending={isPending}
              />
            ))} */}
        {isPending
          ? [...Array(6)].map((_, i) => <Skeleton key={i} height={315} />)
          : recentBlogs?.map((blog) => <SingleBlogCard key={blog?._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default RecentPosts;
