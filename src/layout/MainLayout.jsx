import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Main = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Scroll To Top */}
      <ScrollToTop />
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="px-5 pt-16 md:px-0 container mx-auto min-h-[calc(100vh-285px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Main;
