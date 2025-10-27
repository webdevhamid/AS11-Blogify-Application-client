import { Link } from "react-router";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import Spinner from "../Spinner/Spinner";
import Skeleton from "react-loading-skeleton";

const ArticleTemplate = ({ title, imageURL, id, category, isPending }) => {
  if (isPending) return <Skeleton className="h-full max-h-full" />;
  return (
    <Link
      className={`relative overflow-hidden bg-center bg-cover w-full max-h-full`}
      style={{ backgroundImage: `url(${imageURL})` }}
      to={`/single-blog/${id}`}
    >
      {/* overlay */}
      <div className="bg-[rgba(30,30,30,0.4)] hover:bg-[rgba(30,30,30,0.2)] transform duration-1000 absolute w-full h-full"></div>

      {/* Article Badge */}
      <CategoryBadge category={category} />

      {/* Article Content */}
      <div>
        <button className="md:text-sm lg:text-lg text-sm absolute bottom-0 left-0 text-white text-shadow-base-300 font-medium hover:text-red-400 transform duration-500 p-5 hover:underline cursor-pointer">
          {title}
        </button>
      </div>
    </Link>
  );
};

export default ArticleTemplate;
