import "./AllBlogs.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import SingleBlogCard from "../../components/SingleBlogCard/SingleBlogCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ArticleTemplate from "./../../components/ArticleTemplate/ArticleTemplate";
import useTheme from "../../hooks/useTheme";

const AllBlogs = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const axiosSecure = useAxiosSecure();
  const { skeletonTheme, isDarkMode } = useTheme();
  console.log(isDarkMode);

  // function for fetching all blogs
  const fetchAllBlogs = async () => {
    const { data } = await axiosSecure.get(
      `/blogs?categoryType=${encodeURIComponent(filterCategory)}&search=${encodeURIComponent(
        searchValue
      )}`
    );
    return data;
  };

  // AllBlogs data
  const { data: allBlogs, isPending } = useQuery({
    queryKey: ["all-blogs", filterCategory, searchValue],
    queryFn: fetchAllBlogs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="my-10">
      <div>
        {/* Page Title */}
        <PageTitle title={"All Blogs"} />
        <div className="flex sm:flex-row flex-col gap-3 justify-between mb-5">
          {/* Filter by Category */}
          <select
            defaultValue=""
            className="select sm:w-[250px] w-full"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value={""} disabled>
              Filter by Category
            </option>
            <option>All</option>
            <option>Technology</option>
            <option>Travel</option>
            <option>Health & Wellness</option>
            <option>Business</option>
            <option>Food & Nutrition</option>
            <option>Finance</option>
            <option>Environment</option>
            <option>Productivity </option>
            <option>Lifestyle</option>
            <option>Education</option>
            <option>Lifestyle</option>
            <option>Generic</option>
          </select>
          {/* Search Box */}
          <form onSubmit={handleSubmit}>
            <div className="join sm:w-[350px] w-full">
              <div className="w-full">
                <div>
                  <input
                    className="input join-item"
                    placeholder="Search"
                    name="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn join-item btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-9">
        <SkeletonTheme
          baseColor={skeletonTheme.baseColor}
          highlightColor={skeletonTheme.highlightColor}
        >
          {isPending
            ? [...Array(8)].map((_, i) => <Skeleton key={i} height={248} />)
            : allBlogs?.map((blog) => <SingleBlogCard key={blog._id} blog={blog} />)}
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default AllBlogs;
