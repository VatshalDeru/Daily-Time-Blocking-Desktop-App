import { useReducer } from "react";
import { DateContext } from "./DateContext";
import type { DateContextType } from "./DateContext";

type DateStateType = {
    date: Date;
    tempTaskDate: Date
};

const INITIAL_DATE_STATE_OBJECT: DateStateType = {
    date: new Date(),
    tempTaskDate: new Date(),
};

type Action =
  | {
      type: "UPDATE_DATE";
      payload: {
        date: Date;
      };
    }
  | {
      type: "UPDATE_TEMP_TASK_DATE";
      payload: {
        date: Date;
      };
    }
  | {
      type: "INCREMENT_DATE" | "DECREMENT_DATE";
    };

function dateReducer(state: DateStateType, action: Action): DateStateType{
    switch(action.type) {
        case "UPDATE_DATE" : {
            return {
                ...state,
                date: action.payload.date
            }
        }
        case "UPDATE_TEMP_TASK_DATE" : {
            return {
                ...state,
                tempTaskDate: action.payload.date,
            }
        }
        case "INCREMENT_DATE" : {
            const newDate = new Date(state.date);

            newDate.setDate(newDate.getDate() + 1);
            // console.log(newDate);
            return {
                ...state,
                date: newDate
            }
        }
        case "DECREMENT_DATE" : {
            const newDate = new Date(state.date);

            newDate.setDate(newDate.getDate() - 1);
            // console.log(newDate);
            return {
                ...state,
                date: newDate
            }
        }
        default: return state
    }
}

type DateContextProviderProps = {
    children: React.ReactNode;
};

export default function DateContextProvider({children}: DateContextProviderProps) {
    const [dateState, dateDispatch] = useReducer(dateReducer, INITIAL_DATE_STATE_OBJECT);

    function updateDate(date: Date) {
        dateDispatch({
            type: "UPDATE_DATE",
            payload: {
                date: date
            }
        })
    };

    function updateTempDate(date: Date) {
        dateDispatch({
            type: "UPDATE_TEMP_TASK_DATE",
            payload: {
                date: date
            }
        })
    }

    function incrementDate() {
        dateDispatch({
            type: "INCREMENT_DATE"
        })
    };

    function decrementDate() {
        dateDispatch({
            type: "DECREMENT_DATE"
        })
    };

    const dateCtxValue: DateContextType = {
        date: dateState.date,
        tempDate: dateState.tempTaskDate,
        updateDate,
        updateTempDate,
        incrementDate,
        decrementDate,
    }

    return <DateContext.Provider value={dateCtxValue}>
        {children}
    </DateContext.Provider>
};