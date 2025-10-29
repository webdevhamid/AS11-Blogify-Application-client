import Skeleton from "react-loading-skeleton";
import useAuth from "./../../hooks/useAuth";
import axios from "axios";

const CommentSection = ({ blogData }) => {
  const { user } = useAuth();

  // Comment submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    // const commenterEmail =

    // Post comment
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/add-comment`, { comment });
    console.log(res);
  };
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
            <span className="text-base-content/60">Login to comment!</span>
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
              ></textarea>
              <button
                className="btn join-item btn-primary rounded-full w-fit ml-auto"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        )}

        {/* Comments */}
        <h1 className="text-xl font-semibold mt-10">0 Comments</h1>
        <div className="flex flex-col gap-14 mt-10">
          {/* Comment 1 */}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              {(
                <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
              ) || <Skeleton className="h-full w-full" circle={true} />}
            </div>
            {/* Comment */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name || <Skeleton />}</p>
              <p className="text-lg text-base-content/80">
                {blogData?.excerpt || <Skeleton count={3} />}
              </p>
            </div>
          </div>
          {/* Comment 2 */}
          <div className="flex gap-3">
            <div className="min-w-[40px] h-[40px]">
              {(
                <img src={blogData?.author?.avatar} className="w-full h-full rounded-full" alt="" />
              ) || <Skeleton className="h-full w-full" circle={true} />}
            </div>
            {/* Comment */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2">{blogData?.author?.name || <Skeleton />}</p>
              <p className="text-lg text-base-content/80">
                {blogData?.excerpt || <Skeleton count={3} />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
