import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import SingleBlog from "../pages/SingleBlog/SingleBlog";
import MyBlogs from "../pages/MyBlogs/MyBlogs";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Wishlist from "../pages/Wishlist/Wishlist";
import EditBlog from "../pages/EditBlog/EditBlog";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoutes>
            <AddBlog />
          </PrivateRoutes>
        ),
      },
      {
        path: "all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "featured-blogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
      {
        path: "single-blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "edit/:id",
        element: <EditBlog />,
        loader: async ({ params }) =>
          await axios.get(`${import.meta.env.VITE_API_URL}/single-blog/${params.id}`),
        errorElement: <NotFoundPage />,
      },
      {
        path: "my-blogs",
        element: (
          <PrivateRoutes>
            <MyBlogs />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
