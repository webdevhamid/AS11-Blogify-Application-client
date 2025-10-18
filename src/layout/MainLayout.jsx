import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

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
      <div className="container mx-auto min-h-[calc(100vh-285px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
