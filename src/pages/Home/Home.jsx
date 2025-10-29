import "react-loading-skeleton/dist/skeleton.css";
import BreakingNewsMarquee from "../../components/BreakingNewsMarquee/BreakingNewsMarquee";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div className="sm:mt-5">
      {/* Marquee (Breaking News) */}
      <BreakingNewsMarquee />
      {/* Hero section */}
      <Hero />
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
