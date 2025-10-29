import axios from "axios";
import { Link, useParams } from "react-router";
import { IoShareSocial } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { format } from "date-fns";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";

const SingleBlog = () => {
  const { id } = useParams();
  const shareURL = `https://www.aljazeera.com/news/2025/10/25/sudans-army-battles-rsf-advances-in-el-fasher-bara-as-civil-war-rages`;

  // Fetching blog using tanStack query
  const fetchBlog = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/single-blog/${id}`);
    return data;
  };

  // TanStack query for fetching "specific blog data"
  const { data: blogData, isPending } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: fetchBlog,
  });

  // Fetching specific categories news
  const fetchCategoryBlogs = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blogs?categoryType=${encodeURIComponent(
        blogData?.category
      )}`
    );
    // Filter only unique blogs
    const uniqueBlogs = data.filter((blog) => blog._id !== blogData?._id);
    return uniqueBlogs;
  };

  // TanStack query for fetching "category specific blogs"
  const { data: relatedBlogs, isPending: isRelatedLoading } = useQuery({
    queryKey: ["categoryBlogs", blogData?.category, id],
    queryFn: fetchCategoryBlogs,
    // It will not execute until it gets the blogData?.category
    enabled: !!blogData?.category,
  });

  console.log(relatedBlogs);

  // Loading based on blogData
  // if (isPending) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <ClipLoader color="#fb2c36" />
  //     </div>
  //   );
  // }

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
          <div>
            <div className="flex items-center gap-2 justify-between">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold border-l-8 border-primary pl-4 w-full">
                {isPending ? <Skeleton count={2} /> : blogData?.title}
              </h1>

              {/* Blog Edit Button */}
              <div className="tooltip" data-tip="Edit blog">
                <Link className="btn btn-neutral">
                  <FaEdit />
                </Link>
              </div>
            </div>
            {/* Cover Image */}
            {isPending ? (
              <Skeleton className="w-full my-10 h-full" height={376} />
            ) : (
              <img src={blogData.coverImage} className="w-full my-10" alt="" />
            )}
            <div className="my-5 flex justify-between items-center">
              {/* Author Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm">By</h2>
                  <Link>
                    {isPending ? (
                      <Skeleton borderRadius={100} height={30} width={30} />
                    ) : (
                      <img
                        src={blogData?.author?.avatar}
                        alt=""
                        className="rounded-full w-[30px]"
                      />
                    )}
                  </Link>
                  <Link className="text-sm font-bold">
                    {isPending ? (
                      <Skeleton count={1} width={150} height={20} />
                    ) : (
                      blogData?.author?.name
                    )}
                  </Link>
                </div>
                {/* Published time */}
                <p className="mt-2 text-xs">
                  <span className="font-semibold mr-1">Published at: </span>
                  {isPending ? (
                    <Skeleton width={150} />
                  ) : (
                    format(new Date(blogData?.publishedAt), "dd-MM-yyyy")
                  )}
                </p>
              </div>
              {/* Social Share */}
              <div>
                <div className="dropdown dropdown-end">
                  <div className="tooltip" data-tip="Share blog">
                    <div tabIndex={0} role="button" className="btn btn-primary m-1">
                      <IoShareSocial className="text-xl cursor-pointer" />
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content card card-sm bg-base-100 z-1 w-fit shadow-md"
                  >
                    <div className="flex-row flex p-3 gap-1 justify-center items-center">
                      <FacebookShareButton url={shareURL}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareURL}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <RedditShareButton url={shareURL}>
                        <RedditIcon size={32} round />
                      </RedditShareButton>
                      <WhatsappShareButton url={shareURL}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <TelegramShareButton url={shareURL}>
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      <LinkedinShareButton url={shareURL}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <EmailShareButton url={shareURL}>
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Blog Description */}
            <p className="text-base-content font-normal text-lg/9 text-justify sm:text-left mb-20">
              {blogData?.description || <Skeleton count={10} />}
            </p>
            {/* Blog Category */}
            <div className="mt-5">
              <p className="mb-2 font-semibold">Category: </p>
              <div className="flex flex-col sm:flex-row gap-2 wrap-normal w-full">
                <span className="badge">{blogData?.category}</span>
              </div>
            </div>
            {/* Blog Tags */}
            <div className="mt-5">
              <p className="mb-2 font-semibold">Tags: </p>
              <div className="flex flex-col sm:flex-row gap-2 wrap-normal w-full">
                {blogData?.tags?.map((tag, i) => (
                  <span key={i} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Related news (right) */}
        <div className="flex flex-col col-span-2">
          {/* <div className="sticky top-5 flex flex-col gap-5"> */}
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
        </div>
      </div>
      <div className="divider"></div>
      {/* Comment Section */}
      <h1 className="text-xl font-semibold">Write your comment</h1>
      <div className="py-10 sm:w-[80%] w-full">
        <form>
          <div className="join w-full md:w-2/3 xl:w-1/2 flex gap-2 flex-col">
            <textarea
              className="textarea w-full"
              placeholder="Write down your comment  "
            ></textarea>
            <button className="btn join-item btn-primary rounded-full w-fit ml-auto">Send</button>
          </div>
        </form>
        {/* Comments */}
        <h1 className="text-xl font-semibold mt-10">0 Comments</h1>
        <div className="flex flex-col gap-14 mt-10">
          {/* Comment 1 */}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              {(
                <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
              ) || <Skeleton className="h-full w-full" circle={true} />}
            </div>
            {/* Comment */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name || <Skeleton />}</p>
              <p className="text-lg text-base-content/80">
                {blogData?.excerpt || <Skeleton count={3} />}
              </p>
            </div>
          </div>
          {/* Comment 2 */}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              {(
                <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
              ) || <Skeleton className="h-full w-full" circle={true} />}
            </div>
            {/* Comment */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name || <Skeleton />}</p>
              <p className="text-lg text-base-content/80">
                {blogData?.excerpt || <Skeleton count={3} />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
