import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { useModal } from "../context/ModalContext.tsx";
import { ModalType } from "../context/ModalContextTypes.ts";
import { useNotification } from "../context/NotificationContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { EditableField, EditableFieldForm } from "~features/EditableField.tsx";
import { Task } from "~features/Task.tsx";
import { IList } from "~types/List.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

interface ListProps extends IList {
  isDraggingOver?: boolean;
}

export const List = observer(({ title, id, boardId, isDraggingOver }: ListProps) => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { listStore, taskStore } = useStore();
  const { createNotification } = useNotification();

  useEffect(() => {
    taskStore.getTasks(id);
  }, []);

  const onSuccessfulListUpdate = () => {
    createNotification(t("LISTS.NOTIFICATION_UPDATED"));
  };

  const onListUpdate = (formData: EditableFieldForm) => {
    if (formData.value === title) return;

    listStore.updateList(
      {
        id,
        title: formData.value,
      },
      onSuccessfulListUpdate
    );
  };

  const onAddTask = () => {
    openModal({ type: ModalType.CREATE_TASK, props: { listId: id } });
  };

  const onSuccessfulListDelete = () => {
    createNotification(t("LISTS.NOTIFICATION_DELETED"));
  };

  const onListDelete = () => {
    listStore.deleteList({ id, boardId }, onSuccessfulListDelete);
  };

  return (
    <Stack sx={componentSx.container} gap={2}>
      <Stack direction="row" sx={componentSx.header}>
        <EditableField value={title} onEdit={onListUpdate} />
        <IconButton onClick={onListDelete}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton onClick={onAddTask}>
          <AddIcon color="success" />
        </IconButton>
      </Stack>

      <Stack gap={2} sx={{ border: isDraggingOver ? "3px dashed #ededed" : undefined, ...componentSx.tasksContainer }}>
        {taskStore.getMappableTasks(id).map((task, index) => (
          <Draggable key={task.id} index={index} draggableId={task.id.toString()}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <Task {...task} isDragging={snapshot.isDragging} />
              </div>
            )}
          </Draggable>
        ))}
      </Stack>
    </Stack>
  );
});

const componentSx = createSxStyles({
  container: {
    width: "30rem",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "30rem",
  },
  header: {
    maxWidth: "100%",
    backgroundColor: "#EDEDED",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.5rem",
  },
  tasksContainer: {
    paddingBlock: "1rem",
  },
});
