import { NavLink } from "react-router";

const Breadcrumbs = ({ previousPage, prevLink, currentPage }) => {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {previousPage ||
          (prevLink && (
            <li>
              <NavLink to={`${prevLink}`}>{previousPage}</NavLink>
            </li>
          ))}
        <li>{currentPage}</li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
