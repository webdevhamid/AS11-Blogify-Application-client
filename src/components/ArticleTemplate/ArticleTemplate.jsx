import { Link, NavLink } from "react-router";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const ArticleTemplate = ({ title, imageURL }) => {
  return (
    <Link
      className={`relative overflow-hidden bg-center bg-cover w-full h-full`}
      style={{ backgroundImage: `url(${imageURL})` }}
    >
      {/* overlay */}
      <div className="bg-[rgba(30,30,30,0.4)] hover:bg-[rgba(30,30,30,0.2)] transform duration-1000 absolute w-full h-full"></div>
      {/* Article Content */}
      <div>
        <button className="md:text-sm lg:text-lg text-sm absolute bottom-0 left-0 text-white text-shadow-2xs font-medium hover:text-red-400 transform duration-500 p-5 hover:underline cursor-pointer">
          {title}
        </button>
      </div>
    </Link>
  );
};

export default ArticleTemplate;
