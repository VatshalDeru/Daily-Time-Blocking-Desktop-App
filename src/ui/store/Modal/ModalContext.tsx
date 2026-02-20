import { createContext, useReducer } from "react";

export type modalContentType = 'calender-grid' | 'month-year-selector'

export type ModalContextType = {
    calenderModal: {
        modalVisibility: boolean,
        showModal: () => void,
        hideModal: () => void,
        modalContent: modalContentType,
        toggleModalContent: () => void
    },
    calenderButtonRef: React.RefObject<HTMLDivElement | null>;
    createTaskModal: {
        modalVisibility: boolean,
        showModal: () => void,
        hideModal: () => void,
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
    calenderButtonRef: {current: null},
    createTaskModal: {
        modalVisibility: false,
        showModal: () => {},
        hideModal: () => {},
    }
});


