import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { setupSilentRefresh } from "~core/axios.ts";

import { ModalContextProvider } from "./context/ModalContext.tsx";
import { NotificationContextProvider } from "./context/NotificationContext.tsx";
import { useStore } from "./context/StoreContext.tsx";
import { appTheme } from "./core/theme.ts";

export const App = () => {
  const { userStore } = useStore();

  const onSessionRefresh = (accessToken: string) => {
    userStore.setAccessToken(accessToken);
  };

  const onSessionEnd = () => {
    userStore.logOut();
  };

  useEffect(() => {
    userStore.resetSession();
    setupSilentRefresh(onSessionRefresh, onSessionEnd);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline>
        <NotificationContextProvider>
          <ModalContextProvider>
            <Outlet />
          </ModalContextProvider>
        </NotificationContextProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};
