import { useContext, useEffect, useRef, useState } from "react";

import { formatTime } from "../../../../utils/util";
import { TaskContext } from "../../../../store/Task/TaskContext";
// import { removeAllListeners } from "process";

type TimePickerProps = {
    time: Date,
    period?: "AM" | "PM"
};

type SelectedField = "hours" | "mins" | "period" | null;

export default function TimePicker({ time }: TimePickerProps) {
    const { hours, minutes, period } = formatTime(time);
    const { currTask } = useContext(TaskContext);
    const [selectedField, setSelectedField] = useState<SelectedField>(null);
    const timePickerRef = useRef<HTMLDivElement | null>(null);
    
    // const selectedHandleField = (field) => {
    //     set
    // }

    useEffect(() => {
        // console.log("running")

        const handleKeyToChangeField = (e: KeyboardEvent) => {
            console.log('pressed')
            if(selectedField) {
                if(e.key === 'ArrowLeft') {
                    switch(selectedField) {
                        case "hours" :
                            setSelectedField("period");
                            break;
                        case "mins" :
                            setSelectedField("hours");
                            break;
                        case "period" :
                            setSelectedField("mins");
                            break;
                        default: return;
                    }
                }
                if(e.key === 'ArrowRight') {
                    switch(selectedField) {
                        case "hours" :
                            setSelectedField("mins");
                            break;
                        case "mins" :
                            setSelectedField("period");
                            break;
                        case "period" :
                            setSelectedField("hours");
                            break;
                        default: return;
                    }
                }
            }
        }

        timePickerRef.current?.addEventListener('keydown', handleKeyToChangeField);
        
        const handleClickOut = (e: MouseEvent) => {
            if(timePickerRef.current && !timePickerRef.current.contains(e.target as Node)){
                setSelectedField(null);
                // console.log('click outside')
            }
        }


        document.addEventListener('click', handleClickOut)

        return () => {
            document.removeEventListener('click', handleClickOut);
            timePickerRef.current?.removeEventListener('keydown', handleKeyToChangeField);
        }
    }, [selectedField])

    // const handleClickOutOfTimePicker = () => {

    // };

    const handleClickField = (field: SelectedField) => {
        setSelectedField(field);
        timePickerRef.current?.focus();
    }

    return <div className="timePicker" ref={timePickerRef} tabIndex={0}>
        <span 
            onClick={() => handleClickField("hours")}
            className={selectedField === "hours" ? "selected" : ''}
            style = {selectedField === "hours" ? {
                "--task-colour": currTask.colour
            } as React.CSSProperties: undefined}
        >{hours}</span>
        <span>:</span>
        <span
            onClick={() => handleClickField("mins")}
            className={selectedField === "mins" ? "selected" : ''}
            style = {selectedField === "mins" ? {
                "--task-colour": currTask.colour
            } as React.CSSProperties: undefined}
        >{minutes}</span>
        <span
            onClick={() => handleClickField("period")}
            className={selectedField === "period" ? "selected" : ''}
            style = {selectedField === "period" ? {
                "--task-colour": currTask.colour
            } as React.CSSProperties: undefined}
        > {period}</span>
    </div>
};