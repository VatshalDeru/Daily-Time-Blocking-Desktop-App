import { createContext} from "react";

export type modalContentType = 'calender-grid' | 'month-year-selector';                                                                              

type SingleModal = {
    modalVisibility: boolean,
    showModal: () => void,
    hideModal: () => void,
};

export type createTaskModalMode = "create" | "update";

export type CalenderModal = SingleModal & {
        modalContent: modalContentType,
        toggleModalContent: () => void
    };

export type ModalContextType = {
    calenderModal: CalenderModal,
    calenderButtonRef: React.RefObject<HTMLButtonElement | null> | null;
    createTaskModal: SingleModal & {
        modalMode: 'create',
        setModalMode: (action: createTaskModalMode) => void,
        // timeModal: SingleModal,
    },
    taskDateModal: CalenderModal,
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
        modalMode: 'create',
        setModalMode: () => {},
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


