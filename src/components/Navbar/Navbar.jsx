import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";
import Skeleton from "react-loading-skeleton";

const Navbar = () => {
  const { user, handleLogout, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    await handleLogout();
    setUser(null);
    navigate("/");
  };
  const menu = (
    <>
      <li className="">
        <NavLink
          to={`/`}
          className={({ isActive, isPending }) =>
            isPending
              ? "text-primary"
              : isActive
              ? "text-primary border-b-2 rounded-none"
              : "border-b-2 rounded-none border-transparent hover:border-primary"
          }
        >
          Home
        </NavLink>
      </li>
      {user !== null && (
        <li>
          <NavLink
            to={`/add-blog`}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-primary"
                : isActive
                ? "text-primary border-b-2 rounded-none"
                : "border-b-2 rounded-none border-transparent hover:border-primary"
            }
          >
            Add Blog
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to={`/all-blogs`}
          className={({ isActive, isPending }) =>
            isPending
              ? "text-primary"
              : isActive
              ? "text-primary border-b-2 rounded-none"
              : "border-b-2 rounded-none border-transparent hover:border-primary"
          }
        >
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/featured-blogs`}
          className={({ isActive, isPending }) =>
            isPending
              ? "text-primary"
              : isActive
              ? "text-primary border-b-2 rounded-none"
              : "border-b-2 rounded-none border-transparent hover:border-primary"
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      {user !== null && (
        <li>
          <NavLink
            to={`/wishlist`}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-primary"
                : isActive
                ? "text-primary border-b-2 rounded-none"
                : "border-b-2 rounded-none border-transparent hover:border-primary"
            }
          >
            Wishlist
          </NavLink>
        </li>
      )}
      {user !== null && (
        <li>
          <NavLink
            to={`/my-blogs`}
            className={({ isActive, isPending }) =>
              isPending
                ? "text-primary"
                : isActive
                ? "text-primary border-b-2 rounded-none"
                : "border-b-2 rounded-none border-transparent hover:border-primary"
            }
          >
            My Blogs
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm fixed w-full z-10 top-0">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menu}
            </ul>
          </div>
          <Link
            to={`/`}
            className="font-BBH text-neutral dark:text-base-content font-bold text-3xl uppercase"
          >
            <span>News</span>
            <span className="text-primary">Waves</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        {/* Login/Register */}
        <div className="navbar-end">
          {user?.email ? (
            // Profile dropdown
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                {/* Profile Pic */}
                <div className="w-10 rounded-full border-2 border-primary overflow-hidden">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button>
                    <a>Profile</a>
                  </button>
                </li>
                <li>
                  <button>
                    <a>Settings</a>
                  </button>
                </li>
                <li>
                  <button onClick={handleLogoutUser}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            // Login Button
            <ul className="flex gap-2">
              <li className="hover:text-primary transition">
                <NavLink
                  to={`/login`}
                  className={({ isActive }) => [isActive ? "text-primary transition" : ""]}
                >
                  Login
                </NavLink>
              </li>
              <li className="hover:text-primary transition">
                <NavLink
                  to={`/register`}
                  className={({ isActive }) => [isActive ? "text-primary transition" : ""]}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
          {/* Toggle Dark Mode */}
          <div className="ml-3">
            <input type="checkbox" value="dark" className="toggle theme-controller" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
