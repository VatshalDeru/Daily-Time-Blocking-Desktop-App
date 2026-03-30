import { useContext } from "react";
import TimePicker from "./TimePicker";
import { TaskContext } from "../../../../store/Task/TaskContext";

type DurationWindowProps = {
    startTime: Date,
    endTime: Date
};

export default function DurationWindow({ startTime, endTime }: DurationWindowProps) {
    const { currTask } = useContext(TaskContext);
    return  (
    <div className="timeWindowContainer">
        <TimePicker time={currTask.timeWindow.startTime}/>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H20.5" stroke="#515152" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 19L21 12L14 5" stroke="#515152" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <TimePicker time={currTask.timeWindow.endTime}/>
    </div>
    )
}