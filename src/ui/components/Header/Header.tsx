import { useContext } from "react";
import Button from "../Button/Button";
import { ModalContext } from "../../store/Modal/ModalContext";
import { DateContext } from "../../store/Date/DateContext";
import CalemderButtonDownIcon from "../icons/CalenderButtonDownIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ArrowIcon from "../icons/ArrowIcon";

export default function Header() {
    const { date, incrementDate, decrementDate } = useContext(DateContext);
    const { calenderModal, calenderButtonRef } = useContext(ModalContext);

    return <header>
        <div className="dateControlsContainer" >
            <button className="calenderButton" 
                ref={calenderButtonRef}
                onClick={calenderModal.modalVisibility ? calenderModal.hideModal : calenderModal.showModal}
            >
                <h1>{date.toLocaleString("en-GB", { month: "long" })} <span>{date.getFullYear()}</span></h1>
                <CalemderButtonDownIcon/>
            </button>
            <div className="changeDateButtons">
                <button className="prevDayButton" onClick={decrementDate}>
                    <ArrowIcon/>
                </button>
                <button className="nextDayButton" onClick={incrementDate}>
                    <ArrowIcon/>
                </button>
            </div>
        </div>

        <Button 
            icon={<SettingsIcon/>}
            backgroundColor="#5F5F5F"
            btnDimensions={{ width: 3.5, height: 3.5 }}
        />
    </header>
}