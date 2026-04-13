// import Button from "../Button/Button";
import TaskItem from "./TaskItem/TaskItem";

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
    return <div className="taskContainer">
        {TASKS.map(task => {
            return <TaskItem icon={task.icon} name={task.name} time={task.timeWindow} colour={task.colour}/>
        })}
 
    </div>
};