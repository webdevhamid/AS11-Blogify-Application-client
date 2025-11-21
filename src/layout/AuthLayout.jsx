import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="px-2 sm:px-5 pt-16 md:px-0 container mx-auto min-h-[calc(100vh-285px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default AuthLayout;
