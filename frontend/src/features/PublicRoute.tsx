import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "../context/StoreContext.tsx";
import { useTimeout } from "../hooks/useTimeout.ts";

interface PublicRouteProps {
  redirectOnAuthorized: string;
}

export const PublicRoute = observer(({ children, redirectOnAuthorized }: PropsWithChildren<PublicRouteProps>) => {
  const { userStore } = useStore();
  const firstLoadTimeoutEnded = useTimeout(500);

  return firstLoadTimeoutEnded ? !userStore.accessToken ? children : <Navigate to={redirectOnAuthorized} /> : <Box />;
});
