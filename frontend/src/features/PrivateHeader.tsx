import { Box, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

import { useNotification } from "../context/NotificationContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { createSxStyles } from "~utils/createSxStyles.ts";

import { LanguageSwitcher } from "./LanguageSwitcher";

export const PrivateHeader = () => {
  const { t } = useTranslation();
  const { userStore } = useStore();
  const { createNotification } = useNotification();

  const logOut = () => {
    createNotification(t("NOTIFICATION.LOGOUT"));

    userStore.logOut();
  };

  return (
    <>
      <Box component={"header"} sx={componentSx.header}>
        <Typography color="primary" fontWeight={600} fontSize="1.5rem">
          Trello Turbo
        </Typography>
        <Stack direction="row" gap="1rem">
          <LanguageSwitcher />
          <AppPrimaryButton text={t("PUBLIC_HEADER.LOGOUT")} color="error" onClick={logOut} />
        </Stack>
      </Box>
      <Divider />
    </>
  );
};

const componentSx = createSxStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: "1.5rem",
    paddingInline: "2.5rem",
  },
});
