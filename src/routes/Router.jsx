import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Wishlist from "../pages/WishList/Wishlist";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "add-blog",
        Component: AddBlog,
      },
      {
        path: "all-blogs",
        Component: AllBlogs,
      },
      {
        path: "featured-blogs",
        Component: FeaturedBlogs,
      },
      {
        path: "wishlist",
        Component: Wishlist,
      },
    ],
  },
]);

export default router;
