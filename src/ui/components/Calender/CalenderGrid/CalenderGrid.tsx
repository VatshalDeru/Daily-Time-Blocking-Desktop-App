import { useState } from "react";
import { numOfDaysInMonth } from "../../../utils/calender";

export default function CalenderGrid() {
    const date = new Date();
    const [currMonthYear, setCurrMonthYear] = useState({
        month: date.getMonth(),
        year: date.getFullYear(),
    });
    // console.log(currMonthYear)

    const firstDayOfMonth = new Date(currMonthYear.year, currMonthYear.month).getDay();
    // console.log(date)

    const datesJsxArr:React.ReactNode[] = [];
    for(let i = 1; i <= numOfDaysInMonth(); i++) {
        if(i === 1) datesJsxArr.push(<div key={i} style={{ gridColumnStart: firstDayOfMonth + 1 }}><p>{i}</p></div>)
        datesJsxArr.push(<div key={i}><p>{i}</p></div>)
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