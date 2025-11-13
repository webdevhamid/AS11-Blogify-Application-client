import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";

const MyBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { data: myBlogs } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-blogs/${user?.email}`);
      return data;
    },
  });

  // Blog delete handler
  const handleDelete = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/delete-blog/${user?.email}`, { data: { id } }),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries(["my-blogs", "wishlists"]);
    },
  });

  console.log(myBlogs);
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
            {/* row */}
            {myBlogs?.map((blog, i) => (
              <tr key={blog._id}>
                <th>{i + 1}</th>
                <td>{blog.title}</td>
                <td>{format(new Date(blog.publishedAt), "PPpp")}</td>
                <td>{blog.category}</td>
                <td>
                  <div className="flex-col flex md:flex-row gap-2">
                    <Link className="btn btn-xs btn-primary" to={`/edit/${blog?._id}`}>
                      Edit
                    </Link>
                    <Link
                      className="btn btn-xs btn-primary"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete.mutate(blog._id);
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                            });
                          }
                        })
                      }
                    >
                      Delete
                    </Link>
                    <Link className="btn btn-xs btn-primary" to={`/single-blog/${blog._id}`}>
                      View
                    </Link>
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

export default MyBlogs;
