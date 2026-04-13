import { useReducer } from "react";
import { TaskContext, type CurrTask, type TimeWindow, type TaskContextType} from "./TaskContext"

type TaskStateType = { currTask: CurrTask };

const INITIAL_TASK_STATE_OBJECT = {
    currTask: {
        icon: "solar:sun-bold",
        colour: '#F88E86',
        name: '',
        date: new Date,
        timeWindow: {
            startTime: new Date(),
            endTime: new Date(),
        },
        isCompleted: false,
    }
};

type Action = {type: "SET_ICON", payload: { icon: string }}
    | { type: "SET_COLOUR", payload: { colour: string }}
    | { type: "SET_NAME", payload: { name: string }}
    | { type: "SET_DATE", payload: { date: Date }}
    | { type: "SET_TIME_WINDOW", payload: { timeWindow: TimeWindow }}
    | { type: "SET_IS_COMPLETED", payload: { isCompleted: boolean }};

const taskReducer = (state: TaskStateType, action: Action): TaskStateType => {
    switch(action.type) {
        case "SET_ICON" :
            return {
                currTask: {
                    ...state.currTask,
                    icon: action.payload.icon
                }
            };
        case "SET_COLOUR" :
            return {
                currTask: {
                    ...state.currTask,
                    colour: action.payload.colour
                }
            }
        case "SET_NAME" :
            return {
                currTask: {
                    ...state.currTask,
                    name: action.payload.name
                }
            }
        case "SET_DATE" : {
            const newStartTime = new Date(state.currTask.timeWindow.startTime);
            newStartTime.setFullYear(action.payload.date.getFullYear());
            newStartTime.setMonth(action.payload.date.getMonth());
            newStartTime.setDate(action.payload.date.getDate());

            const newEndTime = new Date(state.currTask.timeWindow.endTime);
            newEndTime.setFullYear(action.payload.date.getFullYear());
            newEndTime.setMonth(action.payload.date.getMonth());
            newEndTime.setDate(action.payload.date.getDate());

            return {
                currTask: {
                    ...state.currTask,
                    date: action.payload.date,
                    timeWindow: {
                        startTime: newStartTime,
                        endTime: newEndTime,
                    }
                }
            }
        }
        case "SET_TIME_WINDOW": {
            const newStartTime = new Date(state.currTask.date as Date);
            newStartTime.setHours(action.payload.timeWindow.startTime.getHours());
            newStartTime.setMinutes(action.payload.timeWindow.startTime.getMinutes());

            const newEndTime = new Date(state.currTask.date as Date);
            newEndTime.setHours(action.payload.timeWindow.endTime.getHours());
            newEndTime.setMinutes(action.payload.timeWindow.endTime.getMinutes());
            


            return {
                currTask: {
                    ...state.currTask,
                    timeWindow: {
                        startTime: newStartTime,
                        endTime: newEndTime
                    }
                }
            }
        }
        case "SET_IS_COMPLETED" :
            return {
                currTask: {
                    ...state.currTask,
                    isCompleted: action.payload.isCompleted
                }
            }
        default: return state;
    };
};

type TaskContextProviderProps = {
    children: React.ReactNode;
}

export default function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [taskState, taskDispatch] = useReducer(taskReducer, INITIAL_TASK_STATE_OBJECT);
    // const { date } = useContext(DateContext);
    const setIcon = (icon: string) => {
        taskDispatch({
            type: "SET_ICON", 
            payload: { icon } 
        })
    };

    const setColour = (colour: string) => {
        taskDispatch({
            type: "SET_COLOUR", 
            payload: { colour } 
        })
    };

    const setName = (name: string) => {
        taskDispatch({
            type: "SET_NAME", 
            payload: { name } 
        })
    };

    const setDate = (date: Date) => {
        taskDispatch({
            type: "SET_DATE", 
            payload: { date } 
        })
    };

    const setTimeWindow = (timeWindow: TimeWindow) => {
        // console.log("setting time window...")
        taskDispatch({
            type: "SET_TIME_WINDOW", 
            payload: { timeWindow } 
        })
    };

    const setIsCompleted = (isCompleted: boolean) => {
        taskDispatch({
            type: "SET_IS_COMPLETED", 
            payload: { isCompleted } 
        })
    };

    const taskCtxValue: TaskContextType = {
        currTask: {
            ...taskState.currTask,
            setIcon,
            setColour,
            setName,
            setDate,
            setTimeWindow,
            setIsCompleted,
        },

    };

    return <TaskContext.Provider value={taskCtxValue}>
        {children}
    </TaskContext.Provider>
};