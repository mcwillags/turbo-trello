import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useNotification } from "../context/NotificationContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { EditableField, EditableFieldForm } from "~features/EditableField.tsx";
import { ITask } from "~types/Task.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

interface TaskProps extends ITask {
  isDragging?: boolean;
}

export const Task = ({ title, id, listId }: TaskProps) => {
  const { t } = useTranslation();
  const { taskStore } = useStore();
  const { createNotification } = useNotification();

  const onSuccessfulTaskUpdate = () => {
    createNotification(t("TASKS.NOTIFICATION_UPDATED"));
  };

  const onTaskUpdate = (formData: EditableFieldForm) => {
    if (formData.value === title) return;

    taskStore.updateTask(
      {
        id,
        title: formData.value,
      },
      onSuccessfulTaskUpdate
    );
  };

  const onSuccessfulTaskDelete = () => {
    createNotification(t("TASKS.NOTIFICATION_DELETED"));
  };

  const onTaskDelete = () => {
    taskStore.deleteTask({ id, listId }, onSuccessfulTaskDelete);
  };

  return (
    <Paper sx={componentSx.container}>
      <Stack direction="row">
        <EditableField value={title} onEdit={onTaskUpdate} />
        <IconButton onClick={onTaskDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const componentSx = createSxStyles({
  container: {
    paddingBlock: "1rem",
    paddingInline: "1.25rem",
  },
});
