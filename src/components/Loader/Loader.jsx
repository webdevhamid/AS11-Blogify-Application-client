import { BarLoader } from "react-spinners";

// Loading custom css
const customLoadingCSS = {
  display: "block",
  margin: "0 auto",
};

const Loader = () => {
  return (
    <div className="grid justify-center h-screen items-center">
      <BarLoader cssOverride={customLoadingCSS} />
    </div>
  );
};

export default Loader;
