import IconTitle from "../IconTitle/IconTitle";
import ArticleTemplate from "../ArticleTemplate/ArticleTemplate";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

  console.log(recentBlogs);

  return (
    <div className="py-20">
      <IconTitle title={`Recent Posts`} />
      <div className="grid h-[800px] sm:h-[650px]  sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {isPending
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
            ))}
      </div>
    </div>
  );
};

export default RecentPosts;
