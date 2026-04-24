import { useContext } from "react";
import TimePicker from "./TimePicker";
import { TaskContext } from "../../../../store/Task/TaskContext";
import LongArrowIcon from "../../../icons/LongArrowIcon";

export default function DurationWindow() {
    const { currTask } = useContext(TaskContext);
    // console.log(currTask.duration)
    return  (
    <div className="timeWindowContainer">
        <TimePicker time={currTask.date as Date} pickerType="startTime"/>
        <LongArrowIcon/>
        <TimePicker time={new Date(currTask.date.getTime() + (currTask.duration as number))} pickerType="endTime"/>
    </div>
    )
}