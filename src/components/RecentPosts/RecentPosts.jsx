import React from "react";
import { GiElectric } from "react-icons/gi";
import FeaturedArticle from "../FeaturedArticle/FeaturedArticle";

const RecentPosts = () => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="bg-red-500 text-white w-fit p-2">
          <GiElectric className="text-2xl" />
        </div>
        <h1 className="text-2xl font-bold">Recent News</h1>
      </div>
      <div className="grid h-[500px] grid-cols-3 gap-5 mt-5">
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
        <FeaturedArticle
          title="Gaza ceasefire live: Hamas says it will hand over another hostage body"
          imageURL={`https://i.ibb.co.com/7NtYFWx6/fighers.jpg`}
        />
      </div>
    </div>
  );
};

export default RecentPosts;
