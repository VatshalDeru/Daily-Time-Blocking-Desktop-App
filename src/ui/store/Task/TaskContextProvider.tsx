import { useReducer } from "react";
import { TaskContext, type CurrTask, type TaskContextType} from "./TaskContext"

type TaskStateType = {
    currTask: CurrTask,
    tasks: {
        tasksForCurrDay: CurrTask[],
        refreshKey: number,
    }
};

const INITIAL_TASK_STATE_OBJECT = {
    currTask: {
        icon: "solar:sun-bold",
        colour: '#F88E86',
        name: '',
        date: null,
        duration: 15*60*1000,
        isCompleted: false,
    },
    tasks:{
        tasksForCurrDay: [],
        refreshKey: 0,
    }
};

type Action = {type: "SET_ICON", payload: { icon: string }}
    | { type: "SET_COLOUR", payload: { colour: string }}
    | { type: "SET_NAME", payload: { name: string }}
    | { type: "SET_DATE", payload: { date: Date }}
    | { type: "SET_DURATION", payload: {duration: number }}
    | { type: "SET_IS_COMPLETED", payload: { isCompleted: boolean }}
    | { type: "SET_CURR_DAY_TASKS", payload: { tasks: CurrTask[] }}
    | { type: "TRIGGER_REFRESH"};

const taskReducer = (state: TaskStateType, action: Action): TaskStateType => {
    switch(action.type) {
        case "SET_ICON" :
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    icon: action.payload.icon
                }
            };
        case "SET_COLOUR" :
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    colour: action.payload.colour
                },
            }
        case "SET_NAME" :
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    name: action.payload.name
                },
            }
        case "SET_DATE" : {
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    date: action.payload.date,
                },
            }
        }
        case "SET_DURATION" : 
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    duration: action.payload.duration
                },
            }
        case "SET_IS_COMPLETED" :
            return {
                ...state,
                currTask: {
                    ...state.currTask,
                    isCompleted: action.payload.isCompleted
                },
            }
        case "SET_CURR_DAY_TASKS": 
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    tasksForCurrDay: action.payload.tasks
                }
            }
        case "TRIGGER_REFRESH": 
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    refreshKey: state.tasks.refreshKey + 1,
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

    const setDuration = (duration: number) => {
        taskDispatch({
            type: "SET_DURATION",
            payload: { duration }
        })
    }

    // const setTimeWindow = (timeWindow: TimeWindow) => {
    //     // console.log("setting time window...")
    //     taskDispatch({
    //         type: "SET_TIME_WINDOW", 
    //         payload: { timeWindow } 
    //     })
    // };

    const setIsCompleted = (isCompleted: boolean) => {
        taskDispatch({
            type: "SET_IS_COMPLETED", 
            payload: { isCompleted } 
        })
    };

    const setTasksForCurrDay = (tasks: CurrTask[]) => {
        taskDispatch({
            type: "SET_CURR_DAY_TASKS",
            payload: { tasks }
        })
    };

    const triggerRefresh = () => {
        taskDispatch({
            type: "TRIGGER_REFRESH"
        });
    }

    const taskCtxValue: TaskContextType = {
        currTask: {
            ...taskState.currTask,
            setIcon,
            setColour,
            setName,
            setDate,
            setDuration,
            // setTimeWindow,
            setIsCompleted,
        },
        tasks: {
            ...taskState.tasks,
            setTasksForCurrDay,
            triggerRefresh,

        }

    };

    return <TaskContext.Provider value={taskCtxValue}>
        {children}
    </TaskContext.Provider>
};