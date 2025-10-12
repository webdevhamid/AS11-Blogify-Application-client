import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="container mx-auto">
        <Outlet />
      </div>
      {/* Footer */}
    </div>
  );
};

export default Main;
