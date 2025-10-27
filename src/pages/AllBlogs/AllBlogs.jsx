import axios from "axios";
import "./AllBlogs.css";
import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import SingleBlogCard from "../../components/SingleBlogCard/SingleBlogCard";
import Skeleton from "react-loading-skeleton";

const AllBlogs = () => {
  const fetchAllBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs`);
    return data;
  };
  const { data: allBlogs, isPending } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: fetchAllBlogs,
  });

  return (
    <div className="my-10">
      <div>
        {/* Page Title */}
        <PageTitle title={"All Blogs"} />
        <div className="flex gap-3 justify-between mb-5">
          <select defaultValue="Pick a color" className="select w-[250px]">
            <option disabled={true}>Filter by Category</option>
            <option>Tech</option>
            <option>Business</option>
            <option>Politics</option>
          </select>
          <div className="join w-[350px]">
            <div className="w-full">
              <div>
                <input className="input join-item" placeholder="Search" />
              </div>
            </div>
            <button className="btn join-item btn-primary">Search</button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {isPending
          ? [...Array(6)].map((_, i) => <Skeleton key={i} height={248} />)
          : allBlogs?.map((blog) => <SingleBlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default AllBlogs;
