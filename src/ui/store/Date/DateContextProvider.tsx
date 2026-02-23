import { useReducer } from "react";
import { DateContext } from "./DateContext";
import type { DateContextType } from "./DateContext";

type DateStateType = {
    date: Date;
};

const INITIAL_DATE_STATE_OBJECT: DateStateType = {
    date: new Date(),
};

type Action = {
    type: "UPDATE_DATE",
    payload: {
        date: Date;
    }
} | {
    type: "INCREMENT_DATE" | "DECREMENT_DATE" | "GET_WEEK";
}

function dateReducer(state: DateStateType, action: Action): DateStateType{
    switch(action.type) {
        case "UPDATE_DATE" :
            console.log(action.payload.date)
            return {
                date: action.payload.date
            }
        case "INCREMENT_DATE" : {
            const newDate = new Date(state.date);

            newDate.setDate(newDate.getDate() + 1);
            console.log(newDate);
            return {
                date: newDate
            }
        }
        case "DECREMENT_DATE" : {
            const newDate = new Date(state.date);

            newDate.setDate(newDate.getDate() - 1);
            console.log(newDate);
            return {
                date: newDate
            }
        }
        // case "GET_WEEK" : {
        //     const currDate = new Date(state.date);

        //     const daysToSubtract
        // }
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
        updateDate,
        incrementDate,
        decrementDate,
    }

    return <DateContext.Provider value={dateCtxValue}>
        {children}
    </DateContext.Provider>
};