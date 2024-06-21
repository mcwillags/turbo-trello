import { Outlet } from "react-router-dom";

import { PublicHeader } from "~features/PublicHeader";

export const PublicPage = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};
