import { useReducer, useRef } from "react";
import { ModalContext } from "./ModalContext";
import type { modalContentType, ModalContextType } from "./ModalContext";
import type { TaskModalActions } from "./ModalContext";

type ModalName = "calenderModal" | "createTaskModal" | "taskDateModal" |"iconModal" | "timeModal";

// type TaskModalName = "dateModal" | "timeModal";

type Action =
  | { type: "SHOW_MODAL"; payload: { modalName: ModalName } }
  | { type: "HIDE_MODAL"; payload: { modalName: ModalName } }
  | { type: "TOGGLE_CALENDER_MODAL_CONTENT" }
  | { type: "TOGGLE_TASK_DATE_MODAL_CONTENT" }
  | { type: "CREATE_TASK_MODAL_ACTIVE" }
  | { type: "UPDATE_TASK_MODAL_ACTIVE" };

type ModalStateType = {
  calenderModal: {
    modalVisibility: boolean;
    modalContent: modalContentType;
  };
  createTaskModal: {
    modalVisibility: boolean;
    isCreating: boolean;
  };
  taskDateModal: {
    modalVisibility: boolean;
    modalContent: modalContentType;
  };
  iconModal:{
    modalVisibility: boolean;
  };
  timeModal:{
    modalVisibility: boolean;
  };
};

const INITIAL_MODAL_STATE_OBJECT: ModalStateType = {
  calenderModal: {
    modalVisibility: false,
    modalContent: "calender-grid",
  },
  createTaskModal: {
    modalVisibility: false,
    isCreating: false,
  },
  taskDateModal: {
    modalVisibility: false,
    modalContent: "calender-grid",
  },
  iconModal: {
    modalVisibility: false,
  },
  timeModal: {
    modalVisibility: false,
  }
};

function modalReducer(state: ModalStateType, action: Action): ModalStateType {
  switch (action.type) {
    case "SHOW_MODAL":
      console.log(state.calenderModal.modalVisibility);
      return {
        ...state,
        [action.payload.modalName]: {
          ...state[action.payload.modalName],
          modalVisibility: true,
        },
      };
    case "HIDE_MODAL":
      console.log(state.calenderModal.modalVisibility);
      return {
        ...state,
        [action.payload.modalName]: {
          ...state[action.payload.modalName],
          modalVisibility: false,
        },
      };
    // case "SHOW_TASK_MODAL":
    //   return {
    //     ...state,
    //     createTaskModal: {
    //       ...state.createTaskModal,
    //       [action.payload.modalName]: {
    //         ...state.createTaskModal[action.payload.modalName],
    //         modalVisibility: true,
    //       },
    //     },
    //   };
    // case "HIDE_TASK_MODAL":
    //   return {
    //     ...state,
    //     createTaskModal: {
    //       ...state.createTaskModal,
    //       [action.payload.modalName]: {
    //         ...state.createTaskModal[action.payload.modalName],
    //         modalVisibility: false,
    //       },
    //     },
    //   };
    case "TOGGLE_CALENDER_MODAL_CONTENT": {
      let newModalContent: modalContentType = state.calenderModal.modalContent;

      if (state.calenderModal.modalContent === "calender-grid") {
        newModalContent = "month-year-selector";
      } else {
        newModalContent = "calender-grid";
      }
      console.log(newModalContent);
      return {
        ...state,
        calenderModal: {
          ...state.calenderModal,
          modalContent: newModalContent,
        },
      };
    }
    case "TOGGLE_TASK_DATE_MODAL_CONTENT": {
      let newModalContent = state.taskDateModal.modalContent;

      if (newModalContent === "calender-grid") {
        newModalContent = "month-year-selector";
      } else {
        newModalContent = "calender-grid";
      }
      console.log("task-date-modal-content: ", newModalContent);

      return {
        ...state,
        taskDateModal: {
          ...state.taskDateModal,
          modalContent: newModalContent,
        },
      };
    }
    case "CREATE_TASK_MODAL_ACTIVE": {
      return {
        ...state,
        createTaskModal:{
          ...state.createTaskModal,
          isCreating: true,
        }
      }
    }
    case "UPDATE_TASK_MODAL_ACTIVE": {
      return {
        ...state,
        createTaskModal:{
          ...state.createTaskModal,
          isCreating: false,
        }
      }
    }
    default:
      return state;
  }
}

type ModalContextProviderProps = {
  children: React.ReactNode;
};

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    INITIAL_MODAL_STATE_OBJECT,
  );
  
  const calenderButtonRef = useRef<HTMLButtonElement>(null);

  const showCalenderModal = () => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        modalName: "calenderModal",
      },
    });
  };

  const hideCalenderModal = () => {
    modalDispatch({
      type: "HIDE_MODAL",
      payload: {
        modalName: "calenderModal",
      },
    });
  };

  const showCreateTaskModal = () => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        modalName: "createTaskModal",
      },
    });
  };

  const hideCreateTaskModal = () => {
    modalDispatch({
      type: "HIDE_MODAL",
      payload: {
        modalName: "createTaskModal",
      },
    });
  };

  const showTaskDateModal = () => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        modalName: "taskDateModal",
      },
    });
  };

  const hideTaskDateModal = () => {
    modalDispatch({
      type: "HIDE_MODAL",
      payload: {
        modalName: "taskDateModal",
      },
    });
  };
  
  // const showTaskTimeModal = () => {
  //   modalDispatch({
  //     type: "SHOW_TASK_MODAL",
  //     payload: {
  //       modalName: "timeModal",
  //     },
  //   });
  // };

  // const hideTaskTimeModal = () => {
  //   modalDispatch({
  //     type: "HIDE_TASK_MODAL",
  //     payload: {
  //       modalName: "timeModal",
  //     },
  //   });
  // };

  const showIconModal = () => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        modalName: "iconModal",
      },
    });
  };

  const hideIconModal = () => {
    modalDispatch({
      type: "HIDE_MODAL",
      payload: {
        modalName: "iconModal",
      },
    });
  };

  const showTimeModal = () => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        modalName: "timeModal",
      }
    })
  }

  const hideTimeModal = () => {
    modalDispatch({
      type: "HIDE_MODAL",
      payload: {
        modalName: "timeModal",
      }
    })
  }
  
  const toggleCalenderModalContent = () => {
    modalDispatch({ type: "TOGGLE_CALENDER_MODAL_CONTENT" });
  };
  
  const toggleTaskDateModalContent = () => {
    modalDispatch({
      type: "TOGGLE_TASK_DATE_MODAL_CONTENT",
    });
  };
  
  // const createTaskModalActive = () => {

  // };

  // const updateTaskModalActive = () => {
  //   modalDispatch({
  //     type: "UPDATE_TASK_MODAL_ACTIVE"
  //   })
  // };

  const setIsCreating = (action: TaskModalActions) => {
    if(action === "create") {
      modalDispatch({
        type: "CREATE_TASK_MODAL_ACTIVE"
      })
    } else if(action === "update") {
      modalDispatch({
        type: "CREATE_TASK_MODAL_ACTIVE"
      })
    }
  }
  
  const modalCtxValue: ModalContextType = {
    calenderModal: {
      modalVisibility: modalState.calenderModal.modalVisibility,
      showModal: showCalenderModal,
      hideModal: hideCalenderModal,
      modalContent: modalState.calenderModal.modalContent,
      toggleModalContent: toggleCalenderModalContent,
    },
    calenderButtonRef: calenderButtonRef,
    createTaskModal: {
      modalVisibility: modalState.createTaskModal.modalVisibility,
      isCreating: modalState.createTaskModal.isCreating,
      showModal: showCreateTaskModal,
      hideModal: hideCreateTaskModal,
      setIsCreating,

      // timeModal: {
      //   modalVisibility: modalState.createTaskModal.timeModal.modalVisibility,
      //   showModal: showTaskTimeModal,
      //   hideModal: hideTaskTimeModal,
      // },
    },
    taskDateModal: {
      modalVisibility: modalState.taskDateModal.modalVisibility,
      showModal: showTaskDateModal,
      hideModal: hideTaskDateModal,
      modalContent: modalState.taskDateModal.modalContent,
      toggleModalContent: toggleTaskDateModalContent,
    },
    iconModal: {
      modalVisibility: modalState.iconModal.modalVisibility,
      showModal: showIconModal,
      hideModal: hideIconModal,
    },
    timeModal: {
      modalVisibility: modalState.timeModal.modalVisibility,
      showModal: showTimeModal,
      hideModal: hideTimeModal,
    }
  };
  return (
    <ModalContext.Provider value={modalCtxValue}>
      {children}
    </ModalContext.Provider>
  );
}
