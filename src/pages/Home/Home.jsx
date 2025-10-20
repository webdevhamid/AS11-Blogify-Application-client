import FeaturedArticle from "../../components/FeaturedArticle/FeaturedArticle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BreakingNewsMarquee from "../../components/BreakingNewsMarquee/BreakingNewsMarquee";
import RecentPosts from "../../components/RecentPosts/RecentPosts";

const Home = () => {
  return (
    <div className="min-h-[400px] mt-5 mb-20">
      {/* Marquee (Breaking News) */}
      <BreakingNewsMarquee />
      {/* Hero Grid */}
      <div className="grid gap-5 md:grid-cols-2 grid-cols-1 min-h-[450px]">
        {/* grid 1 */}
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />

        {/* grid 2 */}
        <div className="grid gap-5 grid-cols-2">
          <FeaturedArticle
            title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
            imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
          />
          <FeaturedArticle
            title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
            imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
          />
          <FeaturedArticle
            title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
            imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
          />
          <FeaturedArticle
            title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
            imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
          />
        </div>
      </div>
      {/* Recent Posts */}
      <div className="py-20">
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
