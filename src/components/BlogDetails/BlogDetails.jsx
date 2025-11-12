import React from "react";
import SocialShare from "../SocialShare/SocialShare";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

const BlogDetails = ({ isPending, blogData, shareURL }) => {
  return (
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
                <img src={blogData?.author?.avatar} alt="" className="rounded-full w-[30px]" />
              )}
            </Link>
            <Link className="text-sm font-bold">
              {isPending ? <Skeleton count={1} width={150} height={20} /> : blogData?.author?.name}
            </Link>
          </div>
          {/* Published time */}
          <p className="mt-2 text-xs">
            <span className="font-semibold mr-1">Published at: </span>
            {isPending ? <Skeleton width={150} /> : format(new Date(blogData?.publishedAt), "PPP")}
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
              <SocialShare shareURL={shareURL} />
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
  );
};

export default BlogDetails;
