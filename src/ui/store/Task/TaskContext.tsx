import { createContext } from "react";

export type TimeWindow = {
  startTime: Date,
  endTime: Date,
}

export type CurrTask = {
  icon: string,
  colour: string,
  name: string,
  date: Date | null,
  timeWindow: TimeWindow,
  isCompleted: boolean,
};

export type TaskContextType = {
    currTask: CurrTask & {
      setIcon: (icon: string) => void,
      setColour: (colour: string) => void,
      setName: (name: string) => void,
      setDate: (date: Date) => void,
      setTimeWindow: (timeWindow: TimeWindow) => void,
      setIsCompleted: (isCompleted: boolean) => void,
    },
}

export const TaskContext = createContext<TaskContextType>({
    currTask: {
        icon: "solar:sun-bold",
        colour: '#F88E86',
        name: '',
        date: null,
        timeWindow: {
          startTime: new Date(),
          endTime: new Date(),
        },
        isCompleted: false,
        setIcon: () => {},
        setColour: () => {},
        setName: () => {},
        setDate: () => {},
        setTimeWindow: () => {},
        setIsCompleted: () => {},
    },
});