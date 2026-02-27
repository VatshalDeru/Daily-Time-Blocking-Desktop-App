import { useContext } from "react";
import { numOfDaysInMonth } from "../../../utils/calender";
import { DateContext } from "../../../store/Date/DateContext";

type CalenderGridProps = {
  date: Date;
  dateUpdatingFn: (date: Date) => void,
};

export default function CalenderGrid({ date, dateUpdatingFn }: CalenderGridProps) {
  const firstDayOfMonth = new Date(2026, date.getMonth()).getDay();
  // console.log(firstDayOfMonth)

  function handleSelectDate(event: React.MouseEvent) {
    const numberDate = event.target.innerText;
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      numberDate,
    );
    console.log(newDate);
    dateUpdatingFn(newDate);
  }

  const datesJsxArr: React.ReactNode[] = [];
  for (
    let i = 1;
    i <= numOfDaysInMonth(date.getMonth(), date.getFullYear());
    i++
  ) {
    if (i === 1) {
      datesJsxArr.push(
        <div
          key={i}
          className={date.getDate() === i ? "selected" : ""}
          style={{ gridColumnStart: firstDayOfMonth + 1 }}
          onClick={handleSelectDate}
        >
          <p>{i}</p>
        </div>,
      );
    } else
      datesJsxArr.push(
        <div
          key={i}
          onClick={handleSelectDate}
          className={date.getDate() === i ? "selected" : ""}
        >
          <p>{i}</p>
        </div>,
      );
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
      <div className="calenderDatesGrid">{datesJsxArr}</div>
    </div>
  );
}
