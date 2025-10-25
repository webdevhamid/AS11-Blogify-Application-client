import { GiElectric } from "react-icons/gi";

const IconTitle = ({ title }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-primary text-white w-fit p-2">
        <GiElectric className="text-2xl" />
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default IconTitle;
