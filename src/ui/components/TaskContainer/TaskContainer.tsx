// import Button from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem/TaskItem";
import { DateContext } from "../../store/Date/DateContext";
import { TaskContext } from "../../store/Task/TaskContext";

const TASKS = [
    {
        icon: "temaki:gym",
        colour: "#F88E86",
        date: "2026-04-12T15:08:09.075Z",
        isCompleted: false,
        name: "test task",
        timeWindow: {
            startTime: new Date("2026-04-12T15:10:09.075Z"),
            endTime: new Date("2026-04-12T15:10:09.075Z")
        }
    },
    {
        icon: 'ri:baseball-fill',
        colour: "#F88E86",
        date: "2026-04-12T15:08:09.075Z",
        isCompleted: false,
        name: "test task",
        timeWindow: {
            startTime: new Date("2026-04-12T15:10:09.075Z"),
            endTime: new Date("2026-04-12T15:25:09.075Z")
        }
    },
    {
        icon: "temaki:gym",
        colour: "#F88E86",
        date: "2026-04-12T15:08:09.075Z",
        isCompleted: false,
        name: "test task",
        timeWindow: {
            startTime: new Date("2026-04-12T15:10:09.075Z"),
            endTime: new Date("2026-04-12T15:25:09.075Z")
        }
    },
]

export default function TaskContainer() {
    // const [tasks, setTasks] = useState([]);
    const { date }  = useContext(DateContext);
    const { tasks } = useContext(TaskContext);

    useEffect(() => {
        console.log("fetching tasks....")
        const fetchTasks = async () => {
            const fetchedTasks = await window.electron.fetchTasks(date);
            console.log(fetchedTasks);
            if(JSON.stringify(fetchTasks) !== JSON.stringify(tasks.tasksForCurrDay)) {
                tasks.setTasksForCurrDay(fetchedTasks);
            };
        };

        fetchTasks();
    }, [date, tasks.refreshKey])


    return <div className="taskContainer">
        {tasks.tasksForCurrDay && tasks.tasksForCurrDay.map((task: object)=> {
            const timeWindow = {
                startTime: task.task_date,
                endTime: new Date(task.task_date.getTime() + task.duration)
            }
            return <TaskItem icon={task.icon} name={task.name} time={timeWindow} colour={task.colour}/>
        })}
 
    </div>
};