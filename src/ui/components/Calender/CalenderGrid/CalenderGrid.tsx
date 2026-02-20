import { useContext, useState } from "react";
import { numOfDaysInMonth } from "../../../utils/calender";
import { DateContext } from "../../../store/Date/DateContext";

export default function CalenderGrid() {
    const { date:dateState, updateDate } = useContext(DateContext);

    // console.log(dateState)

    // const date = new Date();
    // const [currMonthYear, setCurrMonthYear] = useState({
    //     month: date.getMonth(),
    //     year: date.getFullYear(),
    // });
    // console.log(currMonthYear)

    const firstDayOfMonth = new Date(2026, dateState.getMonth()).getDay();
    // console.log(firstDayOfMonth)

    function handleSelectDate(event: React.MouseEvent) {
        const numberDate = event.target.innerText;
        const newDate = new Date(dateState.getFullYear(), dateState.getMonth(), numberDate);
        // console.log(newDate);
        updateDate(newDate);
    }; 

    const datesJsxArr:React.ReactNode[] = [];
    for(let i = 1; i <= numOfDaysInMonth(); i++) {
        if(i === 1) datesJsxArr.push(<div key={i} style={{ gridColumnStart: firstDayOfMonth + 1 }}><p>{i}</p></div>)
       else datesJsxArr.push(<div key={i} onClick={handleSelectDate} className={dateState.getDate() === i ? "selected": ''}><p>{i}</p></div>)
    }


    return (
        <div className="calenderGrid">
            <div className="calenderDaysRow">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="calenderDatesGrid">
                {datesJsxArr}
            </div>
        </div>
    );
};