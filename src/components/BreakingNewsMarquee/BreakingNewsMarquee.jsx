import Marquee from "react-fast-marquee";
import { NavLink } from "react-router";
import { GiElectric } from "react-icons/gi";

const BreakingNewsMarquee = () => {
  return (
    <div className="sm:flex gap-2 mb-2 hidden">
      <button className="w-fit btn bg-primary text-white rounded-none">
        <GiElectric className="text-xl" /> Breaking News
      </button>
      <Marquee pauseOnHover={true}>
        <NavLink className={`hover:text-primary transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas says it will hand over another hostage body
        </NavLink>
        <NavLink className={`hover:text-primary transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas says it will hand over another hostage body
        </NavLink>
        <NavLink className={`hover:text-primary transform font-bold mr-5`}>
          Gaza ceasefire live: Hamas say mr-5s it will hand over another hostage body
        </NavLink>
      </Marquee>
    </div>
  );
};

export default BreakingNewsMarquee;
