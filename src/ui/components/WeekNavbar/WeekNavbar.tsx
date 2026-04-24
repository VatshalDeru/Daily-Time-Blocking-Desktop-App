import { useContext } from "react";
import DayNavbarItems from "./DayNavbarItems/DayNavbarItems";
import { DateContext } from "../../store/Date/DateContext";

export default function WeekNavbar() {
    const { date, updateDate } = useContext(DateContext);

    const currDate = new Date(date);

    // creating the array for the days in the week navbar
    const daysToSubtract = currDate.getDay();
    const weekArr = [];
    for(let i = daysToSubtract; i > (daysToSubtract-7); i--) {
        const weekDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
        weekArr.push(weekDate);
    }
    
    return <div className="weekNavbarContainer">
        {
            weekArr.map(((day, index) => {
                const dayNum = day.toLocaleDateString("en-GB", { day: "numeric" });
                const dayName = day.toLocaleDateString("en-GB", { weekday: "short" });
                return <DayNavbarItems 
                    key={index} 
                    dayName={dayName} 
                    dayNumber={parseInt(dayNum)} 
                    selected={parseInt(dayNum) === date.getDate()}
                    onClick={() => updateDate(day)}
                />
            }))
        }
    </div>
}