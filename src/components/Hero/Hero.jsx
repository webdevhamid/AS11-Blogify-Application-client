import { useEffect, useState } from "react";
import ArticleTemplate from "../../components/ArticleTemplate/ArticleTemplate";
import axios from "axios";

const Hero = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/featured-blogs`);
      setFeaturedBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  //   Get Main Blog
  const leftFeaturedBlog = featuredBlogs[0];
  const rightFeaturedBlogs = featuredBlogs.slice(1, 5);

  return (
    <div className="grid gap-2 md:gap-5 md:grid-cols-2 grid-cols-1 h-[460px]">
      {/* grid 1 */}
      <ArticleTemplate
        id={leftFeaturedBlog?._id}
        title={leftFeaturedBlog?.title}
        imageURL={leftFeaturedBlog?.coverImage}
        tags={leftFeaturedBlog?.tags}
      />

      {/* grid 2 */}
      <div className="grid gap-2 md:gap-5 grid-cols-2">
        {rightFeaturedBlogs.map((blog) => (
          <ArticleTemplate
            id={blog?._id}
            title={blog?.title}
            imageURL={blog?.coverImage}
            key={blog._id}
            tags={blog?.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
