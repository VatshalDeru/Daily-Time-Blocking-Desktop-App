import Button from "../Button/Button";
import { useContext, useEffect, useRef } from "react";
import MonthYearSelectorModal from "./MonthYearSelectorModal/MonthYearSelectorModal";
import { ModalContext } from "../../store/Modal/ModalContext";
import CalenderGrid from "./CalenderGrid/CalenderGrid";
import ArrowIcon from "../icons/ArrowIcon";
import CloseIcon from "../icons/CloseIcon";

type CalenderModalProps = {
    date: Date,
    dateUpdatingFn: (date: Date) => void
}

export default function CalenderModal({ date, dateUpdatingFn }: CalenderModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const { calenderModal, calenderButtonRef } = useContext(ModalContext);
    // const { date, updateDate } = useContext(DateContext);

    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if(e.key === "Escape") calenderModal.hideModal();
        }

        function handleClickOut(e: MouseEvent) {
            if(modalRef.current && !
                modalRef.current.contains(e.target as Node) && 
                calenderButtonRef && 
                !calenderButtonRef.current?.contains(e.target as Node)){
                    calenderModal.hideModal();
                } 
        }

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleClickOut);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOut);
        }
    }, [calenderButtonRef, calenderModal])

    return <div className="calenderModal" ref={modalRef}>
            <div className="headerContainer">
                <div className="date" onClick={calenderModal.toggleModalContent}>
                    <h3>{date.toLocaleString("en-GB",  { month: "long" })} <span>{date.getFullYear()}</span></h3>
                    <div className="rightArrowIcon">
                        <ArrowIcon/>
                    </div>
                </div>
                <Button onClick={calenderModal.hideModal} 
                    icon={<CloseIcon/>}
                    backgroundColor="#5F5F5F"
                    btnDimensions={{width: 2, height: 2}}
                />
            </div>
            {calenderModal.modalContent === 'calender-grid' ?
                <CalenderGrid date={date} dateUpdatingFn={dateUpdatingFn} parentModal={calenderModal}/>
                :
                <MonthYearSelectorModal date={date} dateUpdatingFn={dateUpdatingFn} parentModal={calenderModal}/>
            }
        </div>
};