import LaunchIcon from "@mui/icons-material/Launch";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useNotification } from "../context/NotificationContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { EditableField, EditableFieldForm } from "~features/EditableField.tsx";
import { Routes } from "~router/constants.ts";
import { IBoard } from "~types/Board.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";
import { formatDate } from "~utils/formatDate.ts";

export const Board = ({ id, createdAt, title, updatedAt }: IBoard) => {
  const { t } = useTranslation();
  const { createNotification } = useNotification();
  const { boardStore } = useStore();

  const onSuccessfulBoardUpdate = () => {
    createNotification(t("BOARDS.NOTIFICATION_UPDATED"));
  };

  const onBoardEdit = (data: EditableFieldForm) => {
    if (data.value === title) return;

    boardStore.updateBoard(
      {
        id,
        title: data.value,
      },
      onSuccessfulBoardUpdate
    );
  };

  const onSuccessfulBoardDelete = () => {
    createNotification(t("BOARDS.NOTIFICATION_DELETED"));
  };

  const onBoardDelete = () => {
    boardStore.deleteBoard(id, onSuccessfulBoardDelete);
  };

  const formattedCreatedAt = formatDate(createdAt);
  const formattedUpdatedAt = formatDate(updatedAt);

  return (
    <Paper sx={componentSx.container}>
      <Stack gap={4}>
        <EditableField value={title} onEdit={onBoardEdit} />
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2}>
            <Typography>{`${t("BOARDS.CREATED_AT")} ${formattedCreatedAt.date} ${t("BOARDS.TIME_SEPARATOR")} ${formattedCreatedAt.time}`}</Typography>
            <Typography>{`${t("BOARDS.UPDATED_AT")} ${formattedUpdatedAt.date} ${t("BOARDS.TIME_SEPARATOR")} ${formattedUpdatedAt.time}`}</Typography>
          </Stack>

          <Box>
            <IconButton component={Link} to={`${Routes.MAIN_BOARDS}/${id}`}>
              <LaunchIcon />
            </IconButton>
          </Box>
        </Stack>
        <AppPrimaryButton text={t("BOARDS.DELETE")} color="error" fullWidth onClick={onBoardDelete} />
      </Stack>
    </Paper>
  );
};

const componentSx = createSxStyles({
  container: {
    paddingBlock: "1rem",
    paddingInline: "1.5rem",
    width: "25rem",
  },
});
