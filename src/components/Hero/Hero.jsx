import ArticleTemplate from "../../components/ArticleTemplate/ArticleTemplate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useTheme from "../../hooks/useTheme";

const Hero = ({ leftFeaturedBlog, rightFeaturedBlogs, isPending }) => {
  const { skeletonTheme } = useTheme();
  return (
    <div className="grid gap-1 md:gap-5 md:grid-cols-2 grid-cols-1 sm:h-[480px] h-[600px]">
      {/* grid 1 */}
      <SkeletonTheme
        baseColor={skeletonTheme.baseColor}
        highlightColor={skeletonTheme.highlightColor}
      >
        {isPending ? (
          [...Array(1)].map((_, i) => <Skeleton className="h-full" key={i} />)
        ) : (
          <ArticleTemplate
            id={leftFeaturedBlog?._id}
            title={leftFeaturedBlog?.title}
            imageURL={leftFeaturedBlog?.coverImage}
            category={leftFeaturedBlog?.category}
            isPending={isPending}
            featuredBlog={true}
          />
        )}
      </SkeletonTheme>

      {/* grid 2 */}
      <div className="grid gap-1 md:gap-5 grid-cols-2">
        <SkeletonTheme
          baseColor={skeletonTheme.baseColor}
          highlightColor={skeletonTheme.highlightColor}
        >
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
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default Hero;
