import { createBrowserRouter, Navigate } from "react-router-dom";

import { App } from "../App.tsx";
import { PrivateRoute } from "~features/PrivateRoute.tsx";
import { PublicRoute } from "~features/PublicRoute.tsx";
import { LoginPage } from "~pages/Auth/LoginPage.tsx";
import { RegisterPage } from "~pages/Auth/RegisterPage.tsx";
import { BoardPage } from "~pages/BoardPage.tsx";
import { BoardsPage } from "~pages/BoardsPage.tsx";
import { ErrorPage } from "~pages/ErrorPage.tsx";
import { MainPage } from "~pages/MainPage.tsx";
import { PrivatePage } from "~pages/PrivatePage.tsx";
import { PublicPage } from "~pages/PublicPage.tsx";

import { Routes } from "./constants.ts";

export const appRouter = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.INDEX,
        element: (
          <PublicRoute redirectOnAuthorized={Routes.MAIN}>
            <PublicPage />
          </PublicRoute>
        ),
        children: [
          {
            path: Routes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: Routes.REGISTER,
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: Routes.MAIN,
        element: (
          <PrivateRoute redirectOnUnauthorized={Routes.INDEX}>
            <PrivatePage />
          </PrivateRoute>
        ),
        children: [
          {
            element: <MainPage />,
          },
          {
            path: Routes.MAIN_BOARDS,
            element: <BoardsPage />,
          },
          {
            path: Routes.MAIN_BOARD,
            element: <BoardPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={Routes.INDEX} />,
      },
    ],
  },
]);
