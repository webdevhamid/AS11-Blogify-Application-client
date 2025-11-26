import "./AllBlogs.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import SingleBlogCard from "../../components/SingleBlogCard/SingleBlogCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTheme from "../../hooks/useTheme";

const AllBlogs = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const axiosSecure = useAxiosSecure();
  const { skeletonTheme } = useTheme();

  const { data: totalBlogs = 0 } = useQuery({
    queryKey: ["total-blogs"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/total-blogs`);
      return result.data;
    },
  });

  // Get total blogs/documents
  // const [totalBlogs, setTotalBlogs] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [...Array(totalPages).keys()];

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/total-blogs`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setTotalBlogs(result);
  //     });
  // }, [itemsPerPage]);

  // how to implement pagination logic
  /*
  1. Define how many data I have -- data count  
      1. Use mongoDB built-in method to calculate the total data -- Create an API endpoint for that

  2. Define how many data I want to show
  3. Define how many pages to show based on dataPerPage
  4. Define prev and next button and their visibility dynamically based on the current page number/status 
  
  */

  // function for fetching all blogs
  const fetchAllBlogs = async () => {
    const { data } = await axiosSecure.get(
      `/blogs?categoryType=${encodeURIComponent(filterCategory)}&search=${encodeURIComponent(
        searchValue
      )}&limit=${itemsPerPage}&page=${currentPage}`
    );
    return data;
  };

  // AllBlogs data
  const { data: allBlogs, isPending } = useQuery({
    queryKey: ["all-blogs", filterCategory, searchValue, currentPage, itemsPerPage],
    queryFn: fetchAllBlogs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleItemPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
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
            <option>Politics</option>
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-9 min-h-[600px]">
        <SkeletonTheme
          baseColor={skeletonTheme.baseColor}
          highlightColor={skeletonTheme.highlightColor}
        >
          {isPending
            ? [...Array(8)].map((_, i) => <Skeleton key={i} height={248} />)
            : allBlogs?.map((blog) => <SingleBlogCard key={blog._id} blog={blog} />)}
        </SkeletonTheme>
      </div>
      {/* Pagination */}
      <div className="my-10 flex justify-center">
        <div className="join">
          {pages?.map((page, i) => (
            <button
              key={i}
              className={`join-item btn ${currentPage === page && "bg-primary text-base-100"}`}
              // disabled={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="ml-5">
          <select
            defaultValue={itemsPerPage}
            className="select"
            onChange={(e) => handleItemPerPage(e)}
          >
            <option>5</option>
            <option defaultChecked>8</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
