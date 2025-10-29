import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router";

const RelatedNews = ({ isRelatedLoading, relatedBlogs }) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">Related News</h1>

      {/* News 01 */}
      {isRelatedLoading ? (
        <Spinner />
      ) : relatedBlogs?.length ? (
        relatedBlogs?.map((blog, i) => (
          <div key={i} className="flex gap-3">
            {/* Image */}
            <Link
              to={`/single-blog/${blog?._id}`}
              className="w-[140px]  h-[80px] sm:h-[120px] hover:opacity-80 transition"
            >
              {(
                <img
                  src={blog?.coverImage}
                  className="w-full h-full object-cover rounded-2xl"
                  alt=""
                />
              ) || <Skeleton className="h-full w-full" borderRadius="16px" />}
            </Link>
            {/* Content */}
            <div className="w-full">
              {/* News title */}
              <Link
                to={`/single-blog/${blog?._id}`}
                className="font-semibold text-sm hover:text-primary transition"
              >
                {isRelatedLoading ? <Skeleton count={2} /> : blog?.title}
              </Link>
              {/* Date */}
              <p className="text-base-content/50">
                {isRelatedLoading ? (
                  <Skeleton count={1} />
                ) : (
                  format(new Date(blog?.publishedAt), "dd-MM-yyyy")
                )}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-primary h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No related news found</span>
        </div>
      )}
    </div>
  );
};

export default RelatedNews;
