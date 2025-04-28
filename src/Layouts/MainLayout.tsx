import { Outlet } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApi";

const MainLayout = () => {
    const { data, error, isLoading, isFetching } = useGetProductsQuery({ 
        limit: 10,
        skip: 5
      });
    console.log(data)
  return (
    <div>
      <h3>hello</h3>
      <Outlet/>
    </div>
  );
};

export default MainLayout;