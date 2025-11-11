import "react-loading-skeleton/dist/skeleton.css";
import BreakingNewsMarquee from "../../components/BreakingNewsMarquee/BreakingNewsMarquee";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Hero from "../../components/Hero/Hero";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const fetchBannerBlogs = async () => {
    const { data } = await axiosSecure.get(`/blogs?featuredQuery=true`);
    return data;
  };

  // Fetching blogs data using tanStack query
  const { isPending, data: featuredBlogs } = useQuery({
    queryKey: ["featured-banners"],
    queryFn: fetchBannerBlogs,
  });

  //   Get Main Blogs
  const leftFeaturedBlog = featuredBlogs?.[0];
  const rightFeaturedBlogs = featuredBlogs?.slice(1, 5);
  return (
    <div className="sm:mt-5">
      {/* Marquee (Breaking News) */}
      <BreakingNewsMarquee />
      {/* Hero section */}
      <Hero
        leftFeaturedBlog={leftFeaturedBlog}
        rightFeaturedBlogs={rightFeaturedBlogs}
        isPending={isPending}
      />
      {/* Recent Posts */}
      <RecentPosts />
      {/* News letter Section */}
      <div>
        <NewsLetter />
      </div>
    </div>
  );
};

export default Home;
