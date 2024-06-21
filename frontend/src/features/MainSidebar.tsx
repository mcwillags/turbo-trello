import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Routes } from "~router/constants.ts";

const DRAWER_WIDTH = 240;

export const MainSidebar = () => {
  const { t } = useTranslation();

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to={Routes.MAIN}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("MAIN_SIDEBAR.MAIN")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to={Routes.MAIN_BOARDS}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={t("MAIN_SIDEBAR.BOARDS")} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box>
      <Stack
        component="nav"
        direction="row"
        gap={4}
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 }, height: "100%" }}
        aria-label="mailbox folders"
      >
        {drawer}
        <Divider orientation="vertical" flexItem={true} />
      </Stack>
    </Box>
  );
};
