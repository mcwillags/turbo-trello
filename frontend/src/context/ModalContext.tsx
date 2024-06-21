import { createContext, PropsWithChildren, useContext, useState } from "react";

import { CreateBoardModal } from "~features/CreateBoardModal.tsx";
import { CreateListModal } from "~features/CreateListModal.tsx";
import { CreateTaskModal } from "~features/CreateTaskModal.tsx";

import { ModalEvent, ModalType } from "./ModalContextTypes.ts";

interface IModalContext {
  openModal: (event: ModalEvent) => void;
  closeModal: () => void;
}

export const ModalContext = createContext({} as IModalContext);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalEvent, setModalEvent] = useState<ModalEvent>({ type: ModalType.NONE });

  const openModal = (event: ModalEvent) => {
    setModalEvent(event);
  };

  const closeModal = () => {
    setModalEvent({ type: ModalType.NONE });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalEvent.type === ModalType.CREATE_BOARD && <CreateBoardModal />}
      {modalEvent.type === ModalType.CREATE_LIST && <CreateListModal {...modalEvent.props} />}
      {modalEvent.type === ModalType.CREATE_TASK && <CreateTaskModal {...modalEvent.props} />}
    </ModalContext.Provider>
  );
};
