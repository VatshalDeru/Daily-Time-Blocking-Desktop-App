import { useContext, useEffect, useRef, useState } from "react";

import { formatTime, getHoursAndPeriod } from "../../../../utils/util";
import { TaskContext } from "../../../../store/Task/TaskContext";
// import { removeAllListeners } from "process";

type TimePickerProps = {
    time: Date;
    pickerType: "startTime" | "endTime";
};

type SelectedField = "hours" | "mins" | "period" | null;

export default function TimePicker({ time, pickerType }: TimePickerProps) {
    const { hours, minutes, period } = formatTime(time);
    const { currTask } = useContext(TaskContext);
    const [selectedField, setSelectedField] = useState<SelectedField>(null);
    const timePickerRef = useRef<HTMLDivElement | null>(null);
    
const updateDurationField = (field: "hours" | "mins", pickerType: TimePickerProps['pickerType'], change: 1 | -1) => {
    if(!currTask.date) return;

    if(pickerType === 'startTime') {
        // Only update hours/minutes, keep the date part
        const newDate = new Date(currTask.date);
        if(field === "hours") newDate.setHours(newDate.getHours() + change);
        else if (field === "mins") newDate.setMinutes(newDate.getMinutes() + change);
        currTask.setDate(newDate);
    } else if(pickerType === 'endTime') {
        // Compute current end time, adjust it, then update duration in ms
        const currentEndTime = new Date(currTask.date.getTime() + currTask.duration);
        const newTime = new Date(currentEndTime);
        if(field === "hours") newTime.setHours(newTime.getHours() + change);
        else if (field === "mins") newTime.setMinutes(newTime.getMinutes() + change);
        const newDurationMs = newTime.getTime() - currTask.date.getTime();
        currTask.setDuration(newDurationMs);
    }
};

    const togglePeriod = (pickerType: TimePickerProps["pickerType"]) => {
        if(!currTask.date) return;

        if(pickerType === 'startTime') {
            const newTime = new Date(currTask.date);
            const { period: currPeriod } = getHoursAndPeriod(newTime);
            if(currPeriod === "AM") {
                newTime.setHours(newTime.getHours() + 12);
            } else {
                newTime.setHours(newTime.getHours() - 12);
            }
            currTask.setDate(newTime);
        } else if(pickerType === 'endTime') {
            const currentEndTime = new Date(currTask.date.getTime() + currTask.duration * 60000);
            const newTime = new Date(currentEndTime);
            const { period: currPeriod } = getHoursAndPeriod(newTime);
            if(currPeriod === "AM") {
                newTime.setHours(newTime.getHours() + 12);
            } else {
                newTime.setHours(newTime.getHours() - 12);
            }
            const newDurationMs = newTime.getTime() - currTask.date.getTime();
            const newDurationMinutes = Math.round(newDurationMs / 60000);
            currTask.setDuration(newDurationMinutes);
        }
    };

    useEffect(() => {
        // console.log("running")
        const timePicker = timePickerRef.current;
        if(!timePicker) return;

        // function to listen for key inputs to change which field in the picker is active
        const handleKeyToChangeField = (e: KeyboardEvent) => {
            // console.log('pressed')
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
        timePicker.addEventListener('keydown', handleKeyToChangeField);
        
        // function to change values of the picker fields
        const handleKeyToUpdateFieldValue = (e: KeyboardEvent) => {
            console.log("up pressed")
            if(e.key === "ArrowUp") {
                if(selectedField === "hours") {
                    updateDurationField("hours", pickerType, 1)
                } else if(selectedField === 'mins') {
                    updateDurationField("mins", pickerType, 1)
                } else if (selectedField === "period") {
                    togglePeriod(pickerType)
                };
                // } else if(selectedField === '')
            } else if(e.key === "ArrowDown") {
                if(selectedField === "hours") {
                    updateDurationField("hours", pickerType, -1)
                } else if(selectedField === "mins"){
                    updateDurationField("mins", pickerType, -1)
                } else if (selectedField === "period") {
                    togglePeriod(pickerType);
                };
            }
        }

        timePicker.addEventListener('keydown', handleKeyToUpdateFieldValue)
;
        const handleClickOut = (e: MouseEvent) => {
            if(timePickerRef.current && !timePickerRef.current.contains(e.target as Node)){
                setSelectedField(null);
            }
        }
        document.addEventListener('click', handleClickOut)

        return () => {
            document.removeEventListener('click', handleClickOut);
            timePicker.removeEventListener('keydown', handleKeyToChangeField);
            timePicker.removeEventListener('keydown', handleKeyToUpdateFieldValue);
        }
    }, [selectedField, currTask, pickerType, period])

    // const handleClickOutOfTimePicker = () => {

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