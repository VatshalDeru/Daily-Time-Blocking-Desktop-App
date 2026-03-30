import { useState, useRef, useContext } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";

import Button from "../../../Button/Button";
import DurationPickers from "./DurationPickers";
import DurationPresets from "./DurationPresets";
import DurationWindow from "./DurationWindow";
import { ModalContext } from "../../../../store/Modal/ModalContext";

// import type { CurrTask, TimeWindow } from "../../CreateTask";
import { TaskContext } from "../../../../store/Task/TaskContext";

type ActiveDuration = 'custom-duration' | 'preset-duration';

// type TimeModalProps = {
//     accentColour: string, 
//     taskTimeWindow:  TimeWindow,
//     currTask: CurrTask,
//     setCurrTask: React.Dispatch<React.SetStateAction<CurrTask>>
// };

export default function TimeModal() {
    const { timeModal } = useContext(ModalContext);
    const { currTask } = useContext(TaskContext);

    // holds the value for a custom duration that the user has selected for a task
    const [duration, setDuration] = useState({hours: 0, mins: 0});
    // holds the value for a selected preset duration the user has selected for a task
    const [selectedDurationPreset, setSelectedDurationPreset] = useState<number | null>(1);
    // determines which duration is in effect for the task (either a custom duration or a preset)
    const [activeDuration, setActiveDuration] = useState<ActiveDuration>('preset-duration')
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
                icon={<svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1984 0.282736C13.2873 0.193875 13.3928 0.123386 13.5089 0.0752947C13.625 0.0272034 13.7494 0.00245151 13.8751 0.00245151C14.0007 0.00245151 14.1252 0.0272034 14.2413 0.0752947C14.3574 0.123386 14.4629 0.193875 14.5517 0.282736C14.6406 0.371597 14.7111 0.47709 14.7592 0.593193C14.8073 0.709296 14.832 0.833734 14.832 0.959402C14.832 1.08507 14.8073 1.20951 14.7592 1.32561C14.7111 1.44171 14.6406 1.54721 14.5517 1.63607L8.77173 7.41774L14.5517 13.1994L14.6751 13.3494C14.7956 13.5336 14.8491 13.7537 14.8265 13.9727C14.8038 14.1917 14.7065 14.3962 14.5508 14.5519C14.3952 14.7075 14.1907 14.8048 13.9717 14.8275C13.7527 14.8501 13.5326 14.7966 13.3484 14.6761L13.1984 14.5527L7.41673 8.77107L1.63506 14.5544C1.54609 14.6433 1.44049 14.7137 1.32429 14.7618C1.20808 14.8098 1.08355 14.8345 0.957808 14.8344C0.832062 14.8344 0.707563 14.8095 0.591418 14.7613C0.475274 14.7131 0.369759 14.6425 0.280898 14.5536C0.192036 14.4646 0.12157 14.359 0.0735203 14.2428C0.0254709 14.1266 0.000780066 14.0021 0.00085745 13.8763C0.000934835 13.7506 0.0257789 13.6261 0.0739713 13.5099C0.122164 13.3938 0.192761 13.2883 0.281731 13.1994L6.0634 7.41774L0.280064 1.63607L0.158398 1.48607C0.0368922 1.30189 -0.017337 1.08143 0.00486566 0.861902C0.0270684 0.642376 0.124343 0.437235 0.280265 0.281116C0.436188 0.124998 0.641206 0.0274658 0.860705 0.00498749C1.0802 -0.0174908 1.30073 0.0364618 1.48506 0.157736L1.63506 0.282736L7.41673 6.06274L13.1984 0.282736Z" fill="#858585"/>
                    </svg>}
                btnDimensions={{width: 2, height: 2}}
                backgroundColor="#515152"
            />
        </header>
        <DurationWindow
            startTime={currTask.timeWindow.startTime}
            endTime={currTask.timeWindow.endTime}
        />
        <div className="durationContainer">
            <h2>Duration</h2>
            <DurationPickers 
                duration={duration} 
                setDuration={setDuration} 
                setPresetDurationNull={setPresetDurationNull}
                setActiveDuration={setActiveDuration}
            />
        </div>
        <DurationPresets 
            selectedDurationPreset={selectedDurationPreset} 
            setSelectedDurationPreset = {setSelectedDurationPreset} 
            setCustomDurationDefault={setCustomDurationDefault}
            setActiveDuration={setActiveDuration}
            accentColour={currTask.colour}
        />
    </div>
};