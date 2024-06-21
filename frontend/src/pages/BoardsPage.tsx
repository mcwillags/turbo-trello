import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useModal } from "../context/ModalContext.tsx";
import { ModalType } from "../context/ModalContextTypes.ts";
import { useStore } from "../context/StoreContext.tsx";
import { Board } from "~features/Board.tsx";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const BoardsPage = observer(() => {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const { boardStore } = useStore();

  useEffect(() => {
    boardStore.getBoards();
  }, []);

  const onAddBoard = () => {
    openModal({ type: ModalType.CREATE_BOARD });
  };

  return (
    <Box sx={componentSx.container}>
      <Stack direction="row" gap="2rem" alignItems="center">
        <Typography variant="h2">{t("BOARDS.TITLE")}</Typography>
        <IconButton onClick={onAddBoard}>
          <AddIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" gap={4} sx={componentSx.boardsContainer} flexWrap="wrap">
        {boardStore.boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </Stack>
    </Box>
  );
});

const componentSx = createSxStyles({
  container: {
    paddingBlock: "2rem",
  },
  boardsContainer: {
    paddingInline: "2rem",
    paddingBlock: "2rem",
  },
});
