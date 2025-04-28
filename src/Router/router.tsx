import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import ProductEdit from "../pages/ProductEdit";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <NotFound/>,
      children: [
        {
            path: "/",
            element: <ProductList/>
        },
        {
            path: "/products/:id",
            element: <ProductDetail/>
        },
        {
            path: "/products/:id/edit",
            element: <ProductEdit/>
        }
      ]
    },
])

export default router;