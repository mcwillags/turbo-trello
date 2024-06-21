import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "../context/StoreContext.tsx";
import { useTimeout } from "../hooks/useTimeout.ts";

interface PrivateRouteProps {
  redirectOnUnauthorized: string;
}

export const PrivateRoute = observer(({ children, redirectOnUnauthorized }: PropsWithChildren<PrivateRouteProps>) => {
  const { userStore } = useStore();
  const firstLoadTimeoutEnded = useTimeout(500);

  return firstLoadTimeoutEnded ? userStore.accessToken ? children : <Navigate to={redirectOnUnauthorized} /> : <Box />;
});
