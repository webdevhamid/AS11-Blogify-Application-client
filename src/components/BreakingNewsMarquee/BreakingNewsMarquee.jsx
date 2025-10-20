import Marquee from "react-fast-marquee";
import { NavLink } from "react-router";
import { GiElectric } from "react-icons/gi";

const BreakingNewsMarquee = () => {
  return (
    <div className="flex gap-2 mb-2">
      <button className="w-fit btn bg-red-500 text-white rounded-none">
        <GiElectric className="text-xl" /> Breaking News
      </button>
      <Marquee pauseOnHover={true}>
        <NavLink className={`hover:text-red-500 transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas says it will hand over another hostage body
        </NavLink>
        <NavLink className={`hover:text-red-500 transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas says it will hand over another hostage body
        </NavLink>
        <NavLink className={`hover:text-red-500 transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas say mr-5s it will hand over another hostage body
        </NavLink>
      </Marquee>
    </div>
  );
};

export default BreakingNewsMarquee;
