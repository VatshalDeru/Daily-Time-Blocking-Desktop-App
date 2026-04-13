import { useContext } from "react";
import TimePicker from "./TimePicker";
import { TaskContext } from "../../../../store/Task/TaskContext";
import LongArrowIcon from "../../../icons/LongArrowIcon";

export default function DurationWindow() {
    const { currTask } = useContext(TaskContext);
    return  (
    <div className="timeWindowContainer">
        <TimePicker time={currTask.timeWindow.startTime} pickerType="startTime"/>
        <LongArrowIcon/>
        <TimePicker time={currTask.timeWindow.endTime} pickerType="endTime"/>
    </div>
    )
}