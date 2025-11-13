import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import useWishlists from "../../hooks/useWishlists";
import Spinner from "./../../components/Spinner/Spinner";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const [wishlists, isPending] = useWishlists();
  const queryClient = useQueryClient();

  // wishlist delete handler
  const handleDelete = useMutation({
    mutationFn: (id) =>
      axiosSecure.delete("/remove-wishlist", {
        data: { id },
      }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlists"]);
    },
  });

  return (
    <div className="py-10">
      {/* Page Title */}
      <PageTitle title={"My Wishlist"} />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {isPending ? (
          <Spinner />
        ) : (
          <table className="table table-sm md:table-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Post Title</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row */}
              {wishlists?.map((post, i) => (
                <tr key={post._id}>
                  <th>{i + 1}</th>
                  <td>{post?.title}</td>

                  <td>{post?.category}</td>
                  <td>
                    <div className="flex-col flex md:flex-row gap-2">
                      <Link className="btn btn-xs btn-primary" to={`/single-blog/${post.postId}`}>
                        Read
                      </Link>
                      <button
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
                              handleDelete.mutate(post.postId);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          })
                        }
                      >
                        Remove Wishlist
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* {wishlists.length && <NotFoundAlert alertText={"No wishlist found"} />} */}
      </div>
    </div>
  );
};

export default Wishlist;
