import { Link } from "react-router";
const PageTitle = ({ title }) => {
  return (
    <div className="flex items-center mb-2">
      <Link
        to={-1}
        className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-bold text-base-100 shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        &#8592;
      </Link>
      <h1 className="text-3xl font-medium text-center mb-10 border-b-2 pb-2 w-fit border-primary mx-auto px-4">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
