import ArticleTemplate from "../../components/ArticleTemplate/ArticleTemplate";
import Skeleton from "react-loading-skeleton";

const Hero = ({ leftFeaturedBlog, rightFeaturedBlogs, isPending }) => {
  return (
    <div className="grid gap-1 md:gap-5 md:grid-cols-2 grid-cols-1 sm:h-[480px] h-[600px]">
      {/* grid 1 */}

      {isPending ? (
        [...Array(1)].map((_, i) => <Skeleton className="h-full" key={i} />)
      ) : (
        <ArticleTemplate
          id={leftFeaturedBlog?._id}
          title={leftFeaturedBlog?.title}
          imageURL={leftFeaturedBlog?.coverImage}
          category={leftFeaturedBlog?.category}
          isPending={isPending}
        />
      )}

      {/* grid 2 */}
      <div className="grid gap-1 md:gap-5 grid-cols-2">
        {isPending
          ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-full" />)
          : rightFeaturedBlogs?.map((blog) => (
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
