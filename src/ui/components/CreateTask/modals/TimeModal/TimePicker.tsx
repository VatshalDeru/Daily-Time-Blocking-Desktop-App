type TimePickerProps = {
    time: Date,
    period?: "AM" | "PM"
};

export default function TimePicker({ time, period }: TimePickerProps) {
    let hours = time.getHours()
    if(!period) {
        period = hours < 12 ? "AM" : "PM";
    }
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;   
    
    return <div className="timePicker">
        <span>{String(hours).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.getMinutes()).padStart(2, "0")}</span>
        <span> {period}</span>
    </div>
};