import { createContext } from "react";

export type DateContextType = {
    date: Date;
    updateDate: (date: Date) => void;
    incrementDate: () => void;
    decrementDate: () => void;
    getWeek: () => Date[];
}

export const DateContext = createContext<DateContextType>({
    date: new Date(),
    updateDate: () => {},
    incrementDate: () => {},
    decrementDate: () => {},
    getWeek: () =>[],
});