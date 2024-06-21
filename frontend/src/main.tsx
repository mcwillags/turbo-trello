import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { StoreContextProvider } from "./context/StoreContext.tsx";
import { appRouter } from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={appRouter} />
    </StoreContextProvider>
  </React.StrictMode>
);
