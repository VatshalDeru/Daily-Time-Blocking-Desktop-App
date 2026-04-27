// import Button from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem/TaskItem";
import { DateContext } from "../../store/Date/DateContext";
import { TaskContext } from "../../store/Task/TaskContext";
import type { CurrTask } from "../../store/Task/TaskContext";
import { ModalContext } from "../../store/Modal/ModalContext";
import type { taskType } from "../../store/Task/TaskContextProvider";

// const TASKS = [
//     {
//         icon: "temaki:gym",
//         colour: "#F88E86",
//         date: "2026-04-12T15:08:09.075Z",
//         isCompleted: false,
//         name: "test task",
//         timeWindow: {
//             startTime: new Date("2026-04-12T15:10:09.075Z"),
//             endTime: new Date("2026-04-12T15:10:09.075Z")
//         }
//     },
//     {
//         icon: 'ri:baseball-fill',
//         colour: "#F88E86",
//         date: "2026-04-12T15:08:09.075Z",
//         isCompleted: false,
//         name: "test task",
//         timeWindow: {
//             startTime: new Date("2026-04-12T15:10:09.075Z"),
//             endTime: new Date("2026-04-12T15:25:09.075Z")
//         }
//     },
//     {
//         icon: "temaki:gym",
//         colour: "#F88E86",
//         date: "2026-04-12T15:08:09.075Z",
//         isCompleted: false,
//         name: "test task",
//         timeWindow: {
//             startTime: new Date("2026-04-12T15:10:09.075Z"),
//             endTime: new Date("2026-04-12T15:25:09.075Z")
//         }
//     },
// ]

export default function TaskContainer() {
    // const [tasks, setTasks] = useState([]);
    const { date }  = useContext(DateContext);
    const { tasks, currTask } = useContext(TaskContext);
    const { createTaskModal } = useContext(ModalContext);

    useEffect(() => {
        console.log("fetching tasks....")
        const fetchTasks = async () => {
            const fetchedTasks = await window.electron.fetchTasks(date);
            console.log(fetchedTasks);
            if(JSON.stringify(fetchedTasks) !== JSON.stringify(tasks.tasksForCurrDay)) {
                const transformedTasks = fetchedTasks.map(({ task_date, ...task}) => {
                // console.log(task)
                    return {
                        ...task,
                        date: task_date
                    }
                })
                tasks.setTasksForCurrDay(transformedTasks);
            };
        };

        fetchTasks();
    }, [date, tasks.refreshKey])

    const handleTaskClick = (task: CurrTask) => {
        currTask.setCurrTask(task);
        createTaskModal.setModalMode('update');
        createTaskModal.showModal();
    }

    type timeWindowProp = {
        startTime: Date,
        endTime: Date
    }

    return <div className="taskContainer">
        {tasks.tasksForCurrDay && tasks.tasksForCurrDay.map((task: CurrTask)=> {
            const timeWindow: timeWindowProp = {
                startTime: task.date as Date,
                endTime: new Date(task.date?.getTime() as number + task.duration)
            }
            return <TaskItem icon={task.icon} name={task.name} time={timeWindow} colour={task.colour} task={task} onClick={handleTaskClick}/>
        })}
 
    </div>
};