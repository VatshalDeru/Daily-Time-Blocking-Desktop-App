import { useContext, useRef } from "react";
import Button from "../../../Button/Button";
import CalenderGrid from "../../../Calender/CalenderGrid/CalenderGrid";
import { ModalContext } from "../../../../store/Modal/ModalContext";
import MonthYearSelectorModal from "../../../Calender/MonthYearSelectorModal/MonthYearSelectorModal";
import useClickOutside from "../../../../hooks/useClickOutside";
import { TaskContext } from "../../../../store/Task/TaskContext";
import CloseIcon from "../../../icons/CloseIcon";
import ArrowIcon from "../../../icons/ArrowIcon";

type DateInputProps = {
    accentColours: string
}

export default function DateInput({ accentColours }: DateInputProps) {
    const { taskDateModal  } = useContext(ModalContext);
    // const { tempDate, updateTempDate } = useContext(DateContext) |
    const { currTask } = useContext(TaskContext);
    const dateInputRef = useRef<HTMLDivElement>(null);

    useClickOutside({ref: dateInputRef, closeHandler: taskDateModal.hideModal})

    const monthName = currTask.date?.toLocaleString('default', { month: 'long' });
    const year = currTask.date?.getFullYear();
    const fullDate = currTask.date?.toLocaleDateString('en-Gb');

    return <div className="dateInputContainer" ref={dateInputRef}>
        <div className="dateTopSection">
            <h2>Date</h2>
            <Button
                icon={<CloseIcon/>}
                btnDimensions={{ width: 2.5, height: 2.5}}
                onClick={taskDateModal.hideModal}
            />
        </div>
        <input 
            type="text" 
            value={fullDate} 
            style={{ border: `1px ${accentColours} solid` }}
            readOnly
        />
        <div className="monthYearContainer" onClick={taskDateModal.toggleModalContent}>
            <h4>{monthName} <span style={{ color: accentColours }}>{year}</span></h4>
            <ArrowIcon/>
        </div>
        {taskDateModal.modalContent === 'calender-grid'?
            <CalenderGrid date={currTask.date as Date}  dateUpdatingFn={currTask.setDate} parentModal={taskDateModal}/> :
            <MonthYearSelectorModal date={currTask.date as Date} dateUpdatingFn={currTask.setDate} parentModal={taskDateModal}/>
        }
    </div>
};