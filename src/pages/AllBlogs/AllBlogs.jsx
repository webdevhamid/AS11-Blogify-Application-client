import { useLocation } from "react-router";

const AllBlogs = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <h1 className="text-5xl">All Blogs</h1>
    </div>
  );
};

export default AllBlogs;
