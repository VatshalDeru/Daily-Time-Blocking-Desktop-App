import { createContext } from "react";

export type DateContextType = {
    date: Date;
    tempDate: Date;
    updateDate: (date: Date) => void;
    updateTempDate: (date: Date) => void;
    incrementDate: () => void;
    decrementDate: () => void;
}

export const DateContext = createContext<DateContextType>({
    date: new Date(),
    tempDate: new Date(),
    updateDate: () => {},
    updateTempDate: () => {},
    incrementDate: () => {},
    decrementDate: () => {},
});