import { CreateListModalProps } from "~features/CreateListModal.tsx";
import { CreateTaskModalProps } from "~features/CreateTaskModal.tsx";

export const enum ModalType {
  NONE = "NONE",
  CREATE_BOARD = "CREATE_BOARD",
  CREATE_LIST = "CREATE_LIST",
  CREATE_TASK = "CREATE_TASK",
}

interface DefaultEvent {
  type: ModalType.NONE;
  props?: undefined;
}

interface CreateBoardEvent {
  type: ModalType.CREATE_BOARD;
  props?: undefined;
}

interface CreateListEvent {
  type: ModalType.CREATE_LIST;
  props: CreateListModalProps;
}

interface CreateTaskEvent {
  type: ModalType.CREATE_TASK;
  props: CreateTaskModalProps;
}

export type ModalEvent = DefaultEvent | CreateBoardEvent | CreateListEvent | CreateTaskEvent;
