import Marquee from "react-fast-marquee";
import { NavLink } from "react-router";
import { GiElectric } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BreakingNewsMarquee = () => {
  const axiosSecure = useAxiosSecure();

  const fetchBreakingNews = async () => {
    const { data } = await axiosSecure.get(`/blogs?breakingNews=true`);
    return data;
  };

  const { data: breakingNews, isPending } = useQuery({
    queryKey: ["breaking-news"],
    queryFn: fetchBreakingNews,
  });

  return (
    <div className="sm:flex gap-2 mb-2 hidden">
      <button className="w-fit btn bg-primary text-white rounded-none">
        <GiElectric className="text-xl" /> Breaking News
      </button>
      <Marquee pauseOnHover={true}>
        {isPending ? (
          <Skeleton count={1} width={700} />
        ) : (
          breakingNews?.map((news) => (
            <NavLink
              to={`/single-blog/${news._id}`}
              className={`hover:text-primary transform font-bold mr-5`}
            >
              {news.title}
            </NavLink>
          ))
        )}
      </Marquee>
    </div>
  );
};

export default BreakingNewsMarquee;
