import { formatTime } from "../../../../utils/util";

type TimePickerProps = {
    time: Date,
    period?: "AM" | "PM"
};

export default function TimePicker({ time }: TimePickerProps) {
    const { hours, minutes, period } = formatTime(time);
    
    return <div className="timePicker">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span> {period}</span>
    </div>
};