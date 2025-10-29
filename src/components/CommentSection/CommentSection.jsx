import Skeleton from "react-loading-skeleton";
import useAuth from "./../../hooks/useAuth";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router";

const CommentSection = ({ blogData, id }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Comment submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const commenterEmail = user?.email;
    const commenterName = user?.displayName;
    const commenterAvatar = user?.photoURL;
    const blogId = id;
    const commentData = {
      comment,
      commenterEmail,
      commenterName,
      commenterAvatar,
      blogId,
    };

    // Check if comment data exist

    // Post comment
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/add-comment`, commentData);
    console.log(data);
    if (data.acknowledged) {
      toast.success("You comment was sent!");
      form.reset();

      //  Immediately refetch comments
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    }
  };

  // Get all comments
  const fetchAllComments = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${id}`);
    return data;
  };

  // TasStack query for fetching comments data
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", id],
    queryFn: fetchAllComments,
  });

  return (
    <div>
      {/* Comment Section */}
      <div className={`py-10 sm:w-[80%] w-full`}>
        <h1 className="text-xl font-semibold mb-3">Write your comment</h1>
        {/* Comment Form */}

        {user?.email === blogData?.author?.email ? (
          <div role="alert" className="alert alert-warning alert-soft">
            <span className="text-base-content/60">
              You are not allowed to comment on your own blog!
            </span>
          </div>
        ) : !user?.email || user === null ? (
          <div role="alert" className="alert alert-warning alert-soft">
            <span className="text-base-content/60">
              Login to comment!{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        ) : (
          <form
            className={`${user?.email === blogData?.author?.email && "hidden"}`}
            onSubmit={handleSubmit}
          >
            <div className="join w-full md:w-2/3 xl:w-1/2 flex gap-2 flex-col">
              <textarea
                className={`textarea w-full`}
                placeholder="Write down your comment"
                name="comment"
                required
              ></textarea>
              <button
                className={`btn join-item btn-primary rounded-full w-fit ml-auto`}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        )}

        {/* Comments */}
        <h1 className="text-xl font-semibold mt-10">{comments?.length} Comments</h1>
        <div className="flex flex-col gap-14 mt-10">
          {/* Comment 1 */}
          {isPending ? (
            <Spinner />
          ) : (
            comments?.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <div className="min-w-[40px] h-[40px]">
                  {(
                    <img
                      src={comment?.commenterAvatar}
                      className="w-full h-full rounded-full"
                      alt=""
                    />
                  ) || <Skeleton className="h-full w-full" circle={true} />}
                </div>
                {/* Comment content*/}
                <div className="w-full">
                  <p className="text-sm font-semibold mb-2">
                    {comment?.commenterName || <Skeleton />}
                  </p>
                  <p className="text-lg text-base-content/80">
                    {comment?.comment || <Skeleton count={3} />}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
