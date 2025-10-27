import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const Main = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="px-5 md:px-0 container mx-auto min-h-[calc(100vh-285px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
