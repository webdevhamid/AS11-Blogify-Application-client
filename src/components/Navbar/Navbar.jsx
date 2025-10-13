import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, handleLogout, setUser } = useAuth();
  const handleLogoutUser = async () => {
    await handleLogout();
    setUser(null);
  };
  const menu = (
    <>
      <li>
        <NavLink to={`/`} className={({ isActive }) => [isActive ? "text-red-500" : ""]}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={`/add-blog`} className={({ isActive }) => [isActive ? "text-red-500" : ""]}>
          Add Blog
        </NavLink>
      </li>
      <li>
        <NavLink to={`/all-blogs`} className={({ isActive }) => [isActive ? "text-red-500" : ""]}>
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/featured-blogs`}
          className={({ isActive }) => [isActive ? "text-red-500" : ""]}
        >
          Featured Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to={`/wishlist`} className={({ isActive }) => [isActive ? "text-red-500" : ""]}>
          Wishlist
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm">
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
          <Link to={`/`} className="font-BBH text-black font-bold text-3xl">
            Blogify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        {/* Login/Register */}
        <div className="navbar-end">
          {user ? (
            // Profile dropdown
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                {/* Profile Pic */}
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogoutUser}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            // Login Button
            <ul className="flex gap-2">
              <li className="hover:font-medium transition">
                <NavLink
                  to={`/login`}
                  className={({ isActive }) => [isActive ? "font-medium transition" : ""]}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
