import { Link } from "react-router";
import PageTitle from "./../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeaturedBlogs = () => {
  const axiosSecure = useAxiosSecure();

  const fetchFeaturedBlogs = async () => {
    const { data } = await axiosSecure.get(`/blogs?featured=true`);
    return data;
  };
  const { data: featuredBlogs, isPending } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: fetchFeaturedBlogs,
  });

  return (
    <div className="py-10">
      <PageTitle title="Featured Title" />
      <div className="overflow-x-auto">
        {isPending && <Spinner />}

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Post Title</th>
              <th>Published At</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {featuredBlogs?.map((blog, i) => (
              <tr key={blog._id}>
                <th>{i + 1}</th>
                <td>{blog.title}</td>
                <td>{blog.publishedAt}</td>
                <td>{blog.category}</td>
                <td>
                  <div className="flex-col flex md:flex-row gap-2">
                    <Link className="btn btn-xs btn-primary">Edit</Link>
                    <Link className="btn btn-xs btn-primary">Delete</Link>
                    <Link className="btn btn-xs btn-primary">View</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
