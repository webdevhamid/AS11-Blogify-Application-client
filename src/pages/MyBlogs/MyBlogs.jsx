import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-blogs/${user?.email}`);
      return data;
    },
  });

  console.log(data);
  return (
    <div className="py-10">
      <PageTitle title={"My Blogs"} />
      <div className="overflow-x-auto">
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
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Edit</Link>
                  <Link className="btn btn-xs btn-primary">Delete</Link>
                  <Link className="btn btn-xs btn-primary">View</Link>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Edit</Link>
                  <Link className="btn btn-xs btn-primary">Delete</Link>
                  <Link className="btn btn-xs btn-primary">View</Link>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Edit</Link>
                  <Link className="btn btn-xs btn-primary">Delete</Link>
                  <Link className="btn btn-xs btn-primary">View</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBlogs;
