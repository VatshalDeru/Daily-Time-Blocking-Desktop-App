// import { useContext } from "react";
// import { numOfDaysInMonth } from "../../../utils/calender";
// import { DateContext } from "../../../store/Date/DateContext";

import type { CalenderModal } from "../../../store/Modal/ModalContext";

type CalenderGridProps = {
  date: Date;
  dateUpdatingFn: (date: Date) => void,
  parentModal: CalenderModal
};

export default function CalenderGrid({ date, dateUpdatingFn, parentModal }: CalenderGridProps) {
  const firstDayOfMonth = new Date(2026, date.getMonth()).getDay();
  // console.log(firstDayOfMonth)

  function handleSelectDate(numberDate: number) {
    // const numberDate = event.target.innerText;
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      numberDate,
    );
    console.log(newDate);
    dateUpdatingFn(newDate);
    parentModal.hideModal();
  }

  function numOfDaysInMonth(monthIndex: number = new Date().getMonth(), year:number = new Date().getFullYear()): number{
    // const date = new Date(`${monthName} 1, ${year}`);
    return new Date(year, monthIndex + 1, 0).getDate();
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
          onClick={() => handleSelectDate(i)}
        >
          <p>{i}</p>
        </div>,
      );
    } else
      datesJsxArr.push(
        <div
          key={i}
          onClick={()=> handleSelectDate(i)}
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
