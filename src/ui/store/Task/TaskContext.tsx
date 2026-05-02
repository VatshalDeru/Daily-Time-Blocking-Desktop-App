import { createContext } from "react";

export type CurrTask = {
  taskId: number | null,
  icon: string,
  colour: string,
  name: string,
  date: Date | null,
  duration: number,
  isCompleted: boolean,
};

export type TaskContextType = {
    currTask: CurrTask & {
      setTaskId: (id: number) => void,
      setIcon: (icon: string) => void,
      setColour: (colour: string) => void,
      setName: (name: string) => void,
      setDate: (date: Date) => void,
      setDuration: (duration: number) => void,
      setIsCompleted: (isCompleted: boolean) => void,
      setCurrTask: (task: CurrTask) => void
      clearCurrTask: () => void
    },
    tasks: {
      tasksForCurrDay: CurrTask[],
      setTasksForCurrDay: (tasks: CurrTask[]) => void,
      refreshKey: number,
      triggerRefresh: () => void,
    }
}

export const TaskContext = createContext<TaskContextType>({
    currTask: {
        taskId: null,
        icon: "solar:sun-bold",
        colour: '#F88E86',
        name: '',
        date: new Date,
        duration: 15*60*1000,
        isCompleted: false,
        setTaskId: () => {},
        setIcon: () => {},
        setColour: () => {},
        setName: () => {},
        setDate: () => {},
        setDuration: () => {},
        setIsCompleted: () => {},
        setCurrTask: () => {},
        clearCurrTask: () => {}
    },
    tasks: {
      tasksForCurrDay: [],
      setTasksForCurrDay: () => {},
      refreshKey: 0,
      triggerRefresh: () => {},
    }
});