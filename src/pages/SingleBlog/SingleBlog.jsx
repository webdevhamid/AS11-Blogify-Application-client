import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IoShareSocial } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

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

const SingleBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const shareURL = `https://www.aljazeera.com/news/2025/10/25/sudans-army-battles-rsf-advances-in-el-fasher-bara-as-civil-war-rages`;

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlog = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/single-blog/${id}`);

    setBlogData(data);
  };

  console.log(blogData);

  return (
    <div className="py-10">
      {/* Single Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8 relative">
        {/* left */}
        <div className="hidden xl:block">
          <div className="flex h-[500px] justify-center items-center bg-base-200">
            <h1 className="text-xl text-accent-content">Ad</h1>
          </div>
        </div>
        <div className="sm:col-span-3 lg:col-span-4 xl:col-span-3 col-span-1">
          <div>
            <div className="flex items-center">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold border-l-8 border-primary pl-4">
                {blogData.title}
              </h1>

              {/* Blog Edit Button */}
              <div className="tooltip" data-tip="Edit this blog">
                <Link className="btn btn-neutral">
                  <FaEdit />
                </Link>
              </div>
            </div>

            <img src={blogData.coverImage} className="w-full my-10" alt="" />
            <div className="my-5 flex justify-between items-center">
              {/* Author Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm">By</h2>
                  <Link>
                    <img src={blogData?.author?.avatar} alt="" className="rounded-full w-[30px]" />
                  </Link>
                  <Link className="text-sm font-bold">{blogData?.author?.name}</Link>
                </div>
                {/* Published time */}
                <p className="mt-2 text-xs">
                  <span className="font-semibold">Published at</span>: {blogData?.publishedAt}
                </p>
              </div>
              {/* Social Share */}
              <div>
                <div className="dropdown dropdown-end">
                  <div className="tooltip" data-tip="Share this blog">
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
            <p className="text-base-content/90 text-lg text-justify sm:text-left">
              {blogData.description}
            </p>
          </div>
        </div>
        {/* Related news (right) */}
        <div className="flex flex-col col-span-2">
          {/* <div className="sticky top-5 flex flex-col gap-5"> */}
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold">Related News</h1>
            {/* News 1 */}
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-[140px]  h-[80px] sm:h-[120px] overflow-hidden">
                <img
                  src={blogData?.coverImage}
                  className="w-full h-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div>
                {/* News title */}
                <h1 className="font-semibold">{blogData?.title}</h1>
                {/* Date */}
                <p className="text-base-content/50">{blogData?.publishedAt}</p>
              </div>
            </div>
            {/* News 2 */}
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-[140px]  h-[80px] sm:h-[120px] overflow-hidden">
                <img
                  src={blogData?.coverImage}
                  className="w-full h-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div>
                {/* News title */}
                <h1 className="font-semibold">{blogData?.title}</h1>
                {/* Date */}
                <p className="text-base-content/50">{blogData?.publishedAt}</p>
              </div>
            </div>
            {/* News 2 */}
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-[140px]  h-[80px] sm:h-[120px] overflow-hidden">
                <img
                  src={blogData?.coverImage}
                  className="w-full h-full object-cover rounded-2xl"
                  alt=""
                />
              </div>
              <div>
                {/* News title */}
                <h1 className="font-semibold">{blogData?.title}</h1>
                {/* Date */}
                <p className="text-base-content/50">{blogData?.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/* Comment Section */}
      <div className="py-10 sm:w-[80%] w-full">
        <h1 className="text-xl font-semibold mb-5">0 Comments</h1>
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
        <div className="flex flex-col gap-14 mt-8">
          {/* Comment 1 */}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name}</p>
              <p className="text-lg text-base-content/80">
                This is my first ever comment on NewsWave. This is my first ever comment on
                NewsWave. This is my first ever comment on NewsWave. This is my first ever comment
                on NewsWave. This is my first ever comment on NewsWave. This is my first ever
                comment on NewsWave. This is my first ever comment on NewsWave. This is my first
                ever comment on NewsWave. This is my first ever comment on NewsWave. This is my
                first ever comment on NewsWave.
              </p>
            </div>
          </div>
          {/* Comment 2*/}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name}</p>
              <p className="text-lg text-base-content/80">
                This is my first ever comment on NewsWave. This is my first ever comment on
                NewsWave. This is my first ever comment on NewsWave. This is my first ever comment
                on NewsWave. This is my first ever comment on NewsWave. This is my first ever
                comment on NewsWave. This is my first ever comment on NewsWave. This is my first
                ever comment on NewsWave. This is my first ever comment on NewsWave. This is my
                first ever comment on NewsWave.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
