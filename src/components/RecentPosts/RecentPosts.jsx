import React, { useEffect, useState } from "react";
import IconTitle from "../IconTitle/IconTitle";
import ArticleTemplate from "../ArticleTemplate/ArticleTemplate";
import axios from "axios";

const RecentPosts = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/recent-blogs`);
      setRecentBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <IconTitle title={`Recent Posts`} />
      <div className="grid h-[600px] grid-cols-3 gap-5 mt-5">
        {recentBlogs.map((blog) => (
          <ArticleTemplate key={blog._id} title={blog.title} imageURL={blog.coverImage} />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
