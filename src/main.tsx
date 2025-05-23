import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { Provider } from "react-redux";
import { store } from "./redux";
import { Toaster } from "sonner";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          style: { padding: "16px" },
        }}
      />
    </Provider>
  </StrictMode>
);
