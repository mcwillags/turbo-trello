import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import { MainSidebar } from "~features/MainSidebar.tsx";
import { PrivateHeader } from "~features/PrivateHeader.tsx";

export const PrivatePage = () => {
  return (
    <Stack sx={{ minHeight: "100%" }}>
      <PrivateHeader />
      <Stack direction="row" alignItems="stretch" sx={{ flexGrow: 1 }}>
        <MainSidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};
