import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <h3>hello</h3>
      <Outlet/>
    </div>
  );
};

export default MainLayout;