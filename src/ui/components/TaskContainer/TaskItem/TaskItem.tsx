import { Icon } from "@iconify/react";
// import { start } from "repl";

type Time = {
    startTime: Date,
    endTime: Date,
}

type TaskItemsProps = {
    icon: string;
    name: string;
    time: Time;
    // taskDuration?: object;
    colour: string;
};


export default function TaskItem({ icon, name, time, colour }: TaskItemsProps) {
    const startTime = time.startTime.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).toUpperCase().replace(" ", "");
    const endTime = time.endTime.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).toUpperCase().replace(" ", "");
    const timeWindow = time.startTime.getTime() === time.endTime.getTime()?
            startTime
        : `${startTime} - ${endTime}`;
 
    return <div className="taskItem">
        <div className="taskInfo">
            <p className="leftTime">{startTime}</p>
            <div className="taskIconContainer" style={{backgroundColor: colour}}>
                <Icon icon={icon} />
            </div>
            <div className="titleTimeContainer">
                <p className="topTime">{timeWindow}</p>
                <h2>{name}</h2>
            </div>
        </div>
        <button className="checkBox">
        </button>
    </div>
}