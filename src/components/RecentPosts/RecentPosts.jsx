import IconTitle from "../IconTitle/IconTitle";
import ArticleTemplate from "../ArticleTemplate/ArticleTemplate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RecentPosts = () => {
  const fetchRecentBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/recent-blogs`);
    return data;
  };

  const { data: recentBlogs, isPending } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: fetchRecentBlogs,
  });

  return (
    <div className="py-20">
      <IconTitle title={`Recent Posts`} />
      <div className="grid h-[800px] sm:h-[650px]  sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {recentBlogs?.map((blog) => (
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
