import { Link } from "react-router";

const ArticleTemplate = ({ title, imageURL, id }) => {
  return (
    <Link
      className={`relative overflow-hidden bg-center bg-cover w-full max-h-full`}
      style={{ backgroundImage: `url(${imageURL})` }}
      to={`/single-blog/${id}`}
    >
      {/* overlay */}
      <div className="bg-[rgba(30,30,30,0.4)] hover:bg-[rgba(30,30,30,0.2)] transform duration-1000 absolute w-full h-full"></div>

      {/* Article Tags */}
      {/* <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 absolute right-0 top-0">
        {singleTag}
      </span> */}
      {/* <div className="flex">
        {tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-red-500 text-white font-bold text-xs px-2 py-1 absolute right-0 top-0"
          >
            {tag}
          </span>
        ))}
      </div> */}
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
