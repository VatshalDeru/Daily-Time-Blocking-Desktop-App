import { createContext} from "react";

export type modalContentType = 'calender-grid' | 'month-year-selector';                                                                              

type SingleModal = {
    modalVisibility: boolean,
    showModal: () => void,
    hideModal: () => void,
};

export type TaskModalActions = "create" | "update";

export type ModalContextType = {
    calenderModal: SingleModal & {
        modalContent: modalContentType,
        toggleModalContent: () => void
    },
    calenderButtonRef: React.RefObject<HTMLButtonElement | null> | null;
    createTaskModal: SingleModal & {
        isCreating: boolean,
        setIsCreating: (action: TaskModalActions) => void,
        // timeModal: SingleModal,
    },
    taskDateModal: SingleModal & {
        modalContent: modalContentType
        toggleModalContent: () => void
    },
    iconModal: SingleModal,
    timeModal: SingleModal
}

const singleModal = {
    modalVisibility: false,
    showModal: () => {},
    hideModal: () => {},
};

export const ModalContext = createContext<ModalContextType>({
    calenderModal: {
        ...singleModal,
        modalContent: 'calender-grid',
        toggleModalContent: () => {}
    },
    calenderButtonRef: null,
    createTaskModal: {
        ...singleModal,
        isCreating: true,
        setIsCreating: () => {},
        // timeModal: singleModal,
    },
    taskDateModal: {
        ...singleModal,
        modalContent: 'calender-grid',
        toggleModalContent: () => {},
    },
    iconModal: singleModal,
    timeModal: singleModal
});


