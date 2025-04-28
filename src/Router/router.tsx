import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: "helo"
        }
      ]
    },
])

export default router;