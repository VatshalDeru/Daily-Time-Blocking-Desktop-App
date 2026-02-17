import { createContext, useReducer } from "react";
import CalenderModal from "../components/Calender/CalenderModal";

type modalContentType = 'calender-grid' | 'month-year-selector'

type ModalContextType = {
    calenderModal: {
        modalVisibility: boolean,
        showModal: () => void,
        hideModal: () => void,
        modalContent: modalContentType,
        toggleModalContent: () => void
    },
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
    createTaskModal: {
        modalVisibility: false,
        showModal: () => {},
        hideModal: () => {},
    }
});


type ModalName = "calenderModal" | "createTaskModal";

type Action =
  | { type: "SHOW_MODAL"; payload: { modalName: ModalName } }
  | { type: "HIDE_MODAL"; payload: { modalName: ModalName } }
  | { type: "TOGGLE_CALENDER_MODAL_CONTENT"; }
  ;
  
  type ModalState = {
      calenderModal: {
          modalVisibility: boolean;
          modalContent: modalContentType;
        };
        createTaskModal: {
            modalVisibility: boolean;
        };
    };
    
    const INITIAL_MODAL_STATE_OBJECT: ModalState = {
        calenderModal: {
            modalVisibility: false,
            modalContent: 'calender-grid',
        },
        createTaskModal: {
            modalVisibility: false,
        }
    };

function modalReducer(state: ModalState, action: Action): ModalState {
    switch (action.type) {
        case "SHOW_MODAL" :
            return {
                ...state,
                [action.payload.modalName]: {
                    ...state[action.payload.modalName],
                    modalVisibility: true,
                }
            }
        case "HIDE_MODAL" :
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