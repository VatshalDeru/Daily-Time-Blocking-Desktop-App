import { createContext } from "react";

export type CurrTask = {
  icon: string,
  colour: string,
  name: string,
  date: Date,
  duration: number,
  isCompleted: boolean,
};

export type TaskContextType = {
    currTask: CurrTask & {
      setIcon: (icon: string) => void,
      setColour: (colour: string) => void,
      setName: (name: string) => void,
      setDate: (date: Date) => void,
      setDuration: (duration: number) => void,
      setIsCompleted: (isCompleted: boolean) => void,
    },
}

export const TaskContext = createContext<TaskContextType>({
    currTask: {
        icon: "solar:sun-bold",
        colour: '#F88E86',
        name: '',
        date: new Date,
        duration: 15*60*1000,
        isCompleted: false,
        setIcon: () => {},
        setColour: () => {},
        setName: () => {},
        setDate: () => {},
        setDuration: () => {},
        setIsCompleted: () => {},
    },
});