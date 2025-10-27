import ArticleTemplate from "../../components/ArticleTemplate/ArticleTemplate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Hero = () => {
  const fetchBannerBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/banner-blogs`);
    return data;
  };

  // Fetching blogs data using tanStack query
  const { isPending, data: featuredBlogs } = useQuery({
    queryKey: ["banner-blogs"],
    queryFn: fetchBannerBlogs,
  });

  //   Get Main Blogs
  const leftFeaturedBlog = featuredBlogs?.[0];
  const rightFeaturedBlogs = featuredBlogs?.slice(1, 5);

  return (
    <div className="grid gap-2 md:gap-5 md:grid-cols-2 grid-cols-1 h-[460px]">
      {/* grid 1 */}

      <ArticleTemplate
        id={leftFeaturedBlog?._id}
        title={leftFeaturedBlog?.title}
        imageURL={leftFeaturedBlog?.coverImage}
        category={leftFeaturedBlog?.category}
        isPending={isPending}
      />

      {/* grid 2 */}
      <div className="grid gap-2 md:gap-5 grid-cols-2">
        {rightFeaturedBlogs?.map((blog) => (
          <ArticleTemplate
            id={blog?._id}
            title={blog?.title}
            imageURL={blog?.coverImage}
            key={blog._id}
            category={blog?.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
