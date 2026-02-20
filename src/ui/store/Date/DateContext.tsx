import { createContext } from "react";

export type DateContextType = {
    date: Date;
    updateDate: (date: Date) => void;
    incrementDate: () => void;
    decrementDate: () => void;
}

export const DateContext = createContext<DateContextType>({
    date: new Date(),
    updateDate: () => {},
    incrementDate: () => {},
    decrementDate: () => {},
})

// type DateStateType = {
//     date: Date | null;
// };

// const INITIAL_DATE_STATE_OBJECT: DateStateType = {
//     date: new Date(),
// };

// type ActionType = "UPDATE_DATE";
// type Action = {
//     type: ActionType,
//     payload: {
//         date: Date,
//     }
// }

// function dateReducer(state: DateStateType, action: Action): DateStateType{
//     switch(action.type) {
//         case "UPDATE_DATE" :
//             return {
//                 date: action.payload.date
//             }
//     }
// }

// type DateContextProviderProps = {
//     children: React.ReactNode;
// };

// export default function DateContextProvider({children}: DateContextProviderProps) {
//     const [dateState, dateDispatch] = useReducer(dateReducer, INITIAL_DATE_STATE_OBJECT);

//     function updateDate(date: Date) {
//         dateDispatch({
//             type: "UPDATE_DATE",
//             payload: {
//                 date: date
//             }
//         })
//     };

//     const dateCtxValue: DateContextType = {
//         date: dateState.date,
//         updateDate,
//     }

//     return <DateContext.Provider value={dateCtxValue}>
//         {children}
//     </DateContext.Provider>
// };