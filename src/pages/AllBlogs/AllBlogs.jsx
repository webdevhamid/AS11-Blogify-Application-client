import axios from "axios";
import { useEffect, useState } from "react";
import ArticleTemplate from "../../components/ArticleTemplate/ArticleTemplate";
import "./AllBlogs.css";
import { Link } from "react-router";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs`);
    console.log(data);
    setAllBlogs(data);
  };

  console.log(allBlogs);

  return (
    <div className="my-10">
      <div>
        <h1 className="text-3xl font-medium text-center mb-10 border-b-2 pb-2 w-[180px] border-red-500 mx-auto">
          All Blogs
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {allBlogs.map((blog) => (
          <div
            key={blog?._id}
            className="flex md:flex-row flex-col gap-5 overflow-hidden border md:h-[250px] relative transition-border duration-200 rounded-2xl blog-shadow justify-between items-center"
          >
            <Link to={`/single-blog/${blog?._id}`} className="flex-1 h-full w-full">
              <img src={blog?.coverImage} className="w-full h-full object-cover" alt="" />
            </Link>
            {/* Blog Content */}
            <div className="flex flex-col flex-2 gap-3 items-center md:p-0 p-5">
              {/* Blog Title */}
              <div>
                <Link
                  to={`/single-blog/${blog?._id}`}
                  className="hover:underline cursor-pointer transition font-medium md:text-xl xl:text-2xl lg:text-[15px] text-[15px] text-left mt-3"
                >
                  {blog?.title}
                </Link>
              </div>
              {/* Blog Description */}
              <div>
                <p className="text-sm text-left pr-3 md:text-[10px] xl:text-sm sm:text-[10px]">
                  {blog?.excerpt}
                </p>
              </div>
              {/* Blog Actions */}
              <div className="flex flex-row  gap-3 self-start">
                {/* Wishlist Button */}
                <button className="btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="size-[1.2em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Add to Wishlist
                </button>
                {/* Details Button */}
                <button className="btn">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
