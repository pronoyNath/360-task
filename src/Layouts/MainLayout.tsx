import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="px-5 md:px-10 py-3 md:py-5">
      <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;