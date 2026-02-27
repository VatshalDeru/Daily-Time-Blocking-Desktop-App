import { createContext} from "react";

export type modalContentType = 'calender-grid' | 'month-year-selector'

type SingleModal = {
    modalVisibility: boolean,
    showModal: () => void,
    hideModal: () => void,
}

export type ModalContextType = {
    calenderModal: {
        modalVisibility: boolean,
        showModal: () => void,
        hideModal: () => void,
        modalContent: modalContentType,
        toggleModalContent: () => void
    },
    calenderButtonRef: React.RefObject<HTMLButtonElement | null> | null;
    createTaskModal: {
        modalVisibility: boolean,
        showModal: () => void,
        hideModal: () => void,
        dateModal: SingleModal & {
            modalContent: modalContentType
            toggleModalContent: () => void
        },
        timeModal: SingleModal,
    }
}

export const ModalContext = createContext<ModalContextType>({
    calenderModal: {
        modalVisibility: false,
        showModal: () => {},
        hideModal: () => {},
        modalContent: 'calender-grid',
        toggleModalContent: () => {}
    },
    calenderButtonRef: null,
    createTaskModal: {
        modalVisibility: false,
        showModal: () => {},
        hideModal: () => {},
        dateModal: {
            modalVisibility: false,
            showModal: () => {},
            hideModal: () => {},
            modalContent: 'calender-grid',
            toggleModalContent: () => {},
        },
        timeModal: {
            modalVisibility: false,
            showModal: () => {},
            hideModal: () => {},
        },
    }
});


