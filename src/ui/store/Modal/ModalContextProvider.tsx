import { useReducer, useRef } from "react";
import { ModalContext } from "./ModalContext";
import type { modalContentType, ModalContextType } from "./ModalContext";

type ModalName = "calenderModal" | "createTaskModal";

type Action =
  | { type: "SHOW_MODAL"; payload: { modalName: ModalName } }
  | { type: "HIDE_MODAL"; payload: { modalName: ModalName } }
  | { type: "TOGGLE_CALENDER_MODAL_CONTENT"; }
  ;
  
type ModalStateType = {
    calenderModal: {
        modalVisibility: boolean;
        modalContent: modalContentType;
    };
    calenderButtonRef: React.RefObject<HTMLButtonElement | null>;
    createTaskModal: {
        modalVisibility: boolean;
    };
};

const INITIAL_MODAL_STATE_OBJECT: ModalStateType = {
    calenderModal: {
        modalVisibility: false,
        modalContent: 'calender-grid',
    },
    calenderButtonRef: { current: null },
    createTaskModal: {
        modalVisibility: false,
    }
};


function modalReducer(state: ModalStateType, action: Action): ModalStateType {
    switch (action.type) {
        case "SHOW_MODAL" :
            console.log(state.calenderModal.modalVisibility);
            return {
                ...state,
                [action.payload.modalName]: {
                    ...state[action.payload.modalName],
                    modalVisibility: true,
                }
            }
        case "HIDE_MODAL" :
            console.log(state.calenderModal.modalVisibility);
            return {
                ...state,
                [action.payload.modalName]: {
                    ...state[action.payload.modalName],
                    modalVisibility: false,
                }
            }
        case "TOGGLE_CALENDER_MODAL_CONTENT" : {
            let newModalContent: modalContentType = state.calenderModal.modalContent;

            if(state.calenderModal.modalContent === 'calender-grid'){
                newModalContent = 'month-year-selector';
            } else {
                newModalContent = 'calender-grid';
            }
            console.log(newModalContent)
            return {
                ...state,
                calenderModal: {
                    ...state.calenderModal,
                    modalContent: newModalContent
                }
            }
        }
        default:
            return state;
    }
}

type ModalContextProviderProps = {
    children: React.ReactNode;
}

export default function ModalContextProvider({children}: ModalContextProviderProps) {
    const [modalState, modalDispatch] = useReducer(modalReducer, INITIAL_MODAL_STATE_OBJECT);
    const calenderButtonRef = useRef<HTMLButtonElement>(null);

    const showCalenderModal = () => {
        modalDispatch({
            type: "SHOW_MODAL",
            payload: {
                modalName: 'calenderModal'
            }
        })
    };
    const hideCalenderModal = () => {
        modalDispatch({
            type: "HIDE_MODAL",
            payload: {
                modalName: 'calenderModal'
            }
        })
    };

    const showCreateTaskModal = () => {
        modalDispatch({
            type: "SHOW_MODAL",
            payload: {
                modalName: 'createTaskModal'
            }
        })
    };

    const hideCreateTaskModal = () => {
        modalDispatch({
            type: "HIDE_MODAL",
            payload: {
                modalName: 'createTaskModal'
            }
        })
    };
    
    const toggleCalenderModalContent = () => {
        modalDispatch({ type: "TOGGLE_CALENDER_MODAL_CONTENT" })
    };

    const modalCtxValue: ModalContextType =  {
        calenderModal: {
            modalVisibility: modalState.calenderModal.modalVisibility,
            showModal:showCalenderModal,
            hideModal:hideCalenderModal,
            modalContent: modalState.calenderModal.modalContent,
            toggleModalContent: toggleCalenderModalContent,
        },
        calenderButtonRef: calenderButtonRef,
        createTaskModal: {
            modalVisibility: modalState.createTaskModal.modalVisibility,
            showModal:showCreateTaskModal,
            hideModal:hideCreateTaskModal,
        },

    };
    return <ModalContext.Provider value={modalCtxValue}>
        {children}
    </ModalContext.Provider>
}