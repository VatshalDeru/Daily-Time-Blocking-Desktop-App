import { useContext } from "react";
import Button from "../../../Button/Button";
import CalenderGrid from "../../../Calender/CalenderGrid/CalenderGrid";
import { ModalContext } from "../../../../store/Modal/ModalContext";
import MonthYearSelectorModal from "../../../Calender/MonthYearSelectorModal/MonthYearSelectorModal";
import { DateContext } from "../../../../store/Date/DateContext";

export default function DateInput() {
    const { createTaskModal } = useContext(ModalContext);
    const { tempDate, updateTempDate } = useContext(DateContext);

    return <div className="dateInputContainer">
        <div className="dateTopSection">
            <h2>Date</h2>
            <Button
                icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.969 3.21899C11.0223 3.16567 11.0856 3.12338 11.1553 3.09452C11.2249 3.06567 11.2996 3.05082 11.375 3.05082C11.4504 3.05082 11.5251 3.06567 11.5947 3.09452C11.6644 3.12338 11.7277 3.16567 11.781 3.21899C11.8343 3.27231 11.8766 3.3356 11.9055 3.40526C11.9343 3.47492 11.9492 3.54959 11.9492 3.62499C11.9492 3.70039 11.9343 3.77505 11.9055 3.84471C11.8766 3.91438 11.8343 3.97767 11.781 4.03099L8.313 7.49999L11.781 10.969L11.855 11.059C11.9273 11.1695 11.9594 11.3016 11.9458 11.433C11.9323 11.5643 11.8739 11.6871 11.7805 11.7805C11.6871 11.8739 11.5644 11.9323 11.433 11.9458C11.3016 11.9594 11.1695 11.9273 11.059 11.855L10.969 11.781L7.5 8.31199L4.031 11.782C3.97762 11.8353 3.91426 11.8776 3.84453 11.9064C3.77481 11.9352 3.70009 11.9501 3.62465 11.95C3.5492 11.95 3.4745 11.9351 3.40481 11.9061C3.33513 11.8772 3.27182 11.8349 3.2185 11.7815C3.16518 11.7281 3.1229 11.6647 3.09407 11.595C3.06524 11.5253 3.05043 11.4506 3.05048 11.3751C3.05052 11.2997 3.06543 11.225 3.09434 11.1553C3.12326 11.0856 3.16562 11.0223 3.219 10.969L6.688 7.49999L3.218 4.03099L3.145 3.94099C3.0721 3.83048 3.03956 3.6982 3.05288 3.56649C3.0662 3.43477 3.12457 3.31169 3.21812 3.21802C3.31167 3.12435 3.43468 3.06583 3.56638 3.05234C3.69808 3.03885 3.8304 3.07122 3.941 3.14399L4.031 3.21899L7.5 6.68699L10.969 3.21899Z" fill="white"/>
                </svg>}
                variant="close"
                btnDimensions={{ width: 2.5, height: 2.5}}
                onClick={createTaskModal.dateModal.hideModal}
            />
        </div>
        <input type="text" value={tempDate.toLocaleDateString('en-Gb')} readOnly/>
        <div className="monthYearContainer" onClick={createTaskModal.dateModal.toggleModalContent}>
            <h4>February <span>2026</span></h4>
            <svg  width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.6065 21.185L6.121 30.6133L4 28.2567L11.425 20.0067L4 11.7567L6.121 9.4L14.6065 18.8283C14.8877 19.1409 15.0457 19.5647 15.0457 20.0067C15.0457 20.4486 14.8877 20.8725 14.6065 21.185Z" fill="white"/>
            </svg>
        </div>
        {createTaskModal.dateModal.modalContent === 'calender-grid'?
            <CalenderGrid date={tempDate} dateUpdatingFn={updateTempDate}/> :
            <MonthYearSelectorModal date={tempDate} dateUpdatingFn={updateTempDate}/>
        }
    </div>
};