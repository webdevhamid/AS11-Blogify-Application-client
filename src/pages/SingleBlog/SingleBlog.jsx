import { useParams } from "react-router";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import CommentSection from "../../components/CommentSection/CommentSection";
import RelatedNews from "../../components/RelatedNews/RelatedNews";
import BlogDetails from "../../components/BlogDetails/BlogDetails";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import NotFoundAlert from "../../components/NotFoundAlert/NotFoundAlert";

const SingleBlog = () => {
  const { id } = useParams();
  const shareURL = `https://www.aljazeera.com/news/2025/10/25/sudans-army-battles-rsf-advances-in-el-fasher-bara-as-civil-war-rages`;
  const axiosSecure = useAxiosSecure();

  // fetching "specific blog data"
  const {
    data: blogData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-blog/${id}`);
      return data;
    },
    retry: false,
  });

  // Fetching specific categories news
  const fetchCategoryBlogs = async () => {
    const { data } = await axiosSecure.get(
      `/blogs?categoryType=${encodeURIComponent(blogData?.category)}`
    );
    // Filter only unique blogs
    const uniqueBlogs = data.filter((blog) => blog._id !== blogData?._id);
    return uniqueBlogs;
  };

  // fetching "category specific blogs"
  const { data: relatedBlogs, isPending: isRelatedLoading } = useQuery({
    queryKey: ["categoryBlogs", blogData?.category, id],
    queryFn: fetchCategoryBlogs,
    // It will not execute until it gets the blogData?.category
    enabled: !!blogData?.category,
  });

  console.log(relatedBlogs);

  if (isError || blogData?.success === false)
    return <NotFoundAlert alertText={blogData?.message || "This post no longer exists."} />;

  return (
    <div className="py-10">
      {/* Single Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8 relative mb-20">
        {/* left */}
        <div className="hidden xl:block">
          <div className="flex h-[500px] justify-center items-center bg-base-200">
            <h1 className="text-xl text-accent-content">Ad</h1>
          </div>
        </div>
        {/* Middle */}
        <div className="sm:col-span-3 lg:col-span-4 xl:col-span-3 col-span-1">
          <BlogDetails isPending={isPending} blogData={blogData} shareURL={shareURL} />
        </div>
        {/* Related news (right) */}
        <div className="flex flex-col col-span-2">
          {/* <div className="sticky top-5 flex flex-col gap-5"> */}
          <RelatedNews isRelatedLoading={isRelatedLoading} relatedBlogs={relatedBlogs} />
        </div>
      </div>
      <div className="divider"></div>
      {/* Comment Section */}
      <CommentSection blogData={blogData} id={id} />
    </div>
  );
};

export default SingleBlog;
