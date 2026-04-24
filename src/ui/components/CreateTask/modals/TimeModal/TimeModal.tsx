import { useState, useRef, useContext } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";

import Button from "../../../Button/Button";
import DurationPickers from "./DurationPickers";
import DurationPresets from "./DurationPresets";
import DurationWindow from "./DurationWindow";
import { ModalContext } from "../../../../store/Modal/ModalContext";

// import type { CurrTask, TimeWindow } from "../../CreateTask";
import { TaskContext } from "../../../../store/Task/TaskContext";
import CloseIcon from "../../../icons/CloseIcon";

export default function TimeModal() {
    const { timeModal } = useContext(ModalContext);
    const { currTask } = useContext(TaskContext);

    // holds the value for a custom duration that the user has selected for a task
    const [duration, setDuration] = useState({hours: 0, mins: 0});
    // holds the value for a selected preset duration the user has selected for a task
    const [selectedDurationPreset, setSelectedDurationPreset] = useState<number | null>(1);
    // determines which duration is in effect for the task (either a custom duration or a preset)
    const timeModalRef = useRef<HTMLDivElement>(null);

    // determining which duration should be in effect for the duration window and task
    // useEffect(() => {
    //     let endTime;
    //     if(activeDuration === 'custom-duration') {
    //         setCurrTask(prevTask => {
    //             const newTask = {...prevTask}
    //             endTime = taskTimeWindow.endTime;
    //             endTime.setMinutes(endTime.getMinutes() + (duration.hours * 60) + duration.mins);
    //             return newTask;
    //         })
    //         // currTask.time[1].setMinutes(e.getMinutes() + (duration.hours * 60) + duration.mins);
    //     } else if(activeDuration === 'preset-duration' && selectedDurationPreset) {
    //         setCurrTask(prevTask => {
    //             const newTask = {...prevTask}
    //             endTime = taskTimeWindow.endTime;
    //             endTime.setMinutes(endTime.getMinutes() + selectedDurationPreset)
    //             return {
    //                 ...prevTask,
    //                 timeWindow: {
    //                     startTime: newTask.timeWindow.startTime,
    //                     endTime,
    //                 }
    //             };
    //         })
    //     };
    // }, [duration, selectedDurationPreset, activeDuration, setCurrTask]);

    const setCustomDurationDefault = () => {
        setDuration(() => ({
            hours: 1,
            mins: 0,
        }));
    };

    const setPresetDurationNull = () => {
        setSelectedDurationPreset(null);
    };

    useClickOutside({ref: timeModalRef, closeHandler: timeModal.hideModal})
    
    return <div className="timeModalContainer" ref={timeModalRef}>
        <header>
            <h2>Time</h2>
            <Button 
                onClick={timeModal.hideModal}
                icon={<CloseIcon/>}
                btnDimensions={{width: 2, height: 2}}
                backgroundColor="#515152"
            />
        </header>
        <DurationWindow/>
        <div className="durationContainer">
            <h2>Duration</h2>
            <DurationPickers 
                duration={duration} 
                setDuration={setDuration} 
                setPresetDurationNull={setPresetDurationNull}
            />
        </div>
        <DurationPresets 
            selectedDurationPreset={selectedDurationPreset} 
            setSelectedDurationPreset = {setSelectedDurationPreset} 
            setCustomDurationDefault={setCustomDurationDefault}
            accentColour={currTask.colour}
        />
    </div>
};