import { useContext, useRef, useEffect } from "react";
import Button from "../../Button/Button";
import { DateContext } from "../../../store/Date/DateContext";
import { ModalContext } from "../../../store/Modal/ModalContext";

export default function MonthYearSelectorModal() {
    const { date, updateDate } = useContext(DateContext);
    const { calenderModal } = useContext(ModalContext);

    // console.log(date);
    const monthsArr: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const yearsArr: number[] = [2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021];
    
    const monthRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const monthOverlayRef = useRef<HTMLDivElement>(null);
    const yearOverlayRef = useRef<HTMLDivElement>(null);

    const currentSelectedMonth = useRef<number>(date.getMonth());
    const currentSelectedYear = useRef<number>(date.getFullYear());
    // console.log(currentSelectedMonth, currentSelectedYear)
    function checkSelectedItem() {
        const monthOverlayRect = monthOverlayRef.current?.getBoundingClientRect();
        const monthItems = monthRef.current?.querySelectorAll('li');

        if (monthOverlayRect && monthItems) {
            monthItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const isSelected =
                    itemRect.top <= monthOverlayRect.top + monthOverlayRect.height / 2 &&
                    itemRect.bottom >= monthOverlayRect.top + monthOverlayRect.height / 2;

                const monthIndex = monthsArr.indexOf(item.textContent?.trim());
                if (isSelected && (monthIndex !== currentSelectedMonth.current)){
                    currentSelectedMonth.current = monthIndex;
                } 

                item.classList.toggle("selected", isSelected)

            });
        }

        const yearOverlayRect = yearOverlayRef.current?.getBoundingClientRect();
        const yearItems = yearRef.current?.querySelectorAll('li');

        if (yearOverlayRect && yearItems) {
            yearItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const isSelected =
                    itemRect.top <= yearOverlayRect.top + yearOverlayRect.height / 2 &&
                    itemRect.bottom >= yearOverlayRect.top + yearOverlayRect.height / 2;
                
                const parsedYear = parseInt(item.textContent);
                if (isSelected && (parsedYear !== currentSelectedYear.current)){
                    currentSelectedYear.current = parsedYear;
                    console.log(parsedYear)

                }

                item.classList.toggle("selected", isSelected)
            });
        }
    }

    useEffect(() => {
        if(!date) return;

        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const monthItems = monthRef.current?.querySelectorAll("li");
        const yearItems = yearRef.current?.querySelectorAll("li");

        if(monthItems && monthItems[monthIndex]) {
            // console.log(monthItems[monthIndex])
            monthItems[monthIndex].scrollIntoView({
                block: "center",
            })
        }

        const yearIndex = yearsArr.indexOf(year);

        if(yearItems && yearItems[yearIndex]) {
            // console.log(yearItems[yearIndex])

            yearItems[yearIndex].scrollIntoView({
                block: "center",
            })
        }

    }, [date, yearsArr]);

    function handleSelectMonthYear() {
        const newDate = new Date(currentSelectedYear.current, currentSelectedMonth.current, date.getDate());
        // console.log(newDate);
        
        updateDate(newDate);
        calenderModal.toggleModalContent();
    };

    
    
    return <div className="monthYearSelectorModalContainer">
        <div className="selectorContainer">
            <div className="monthSelectorOverlay"
                ref={monthOverlayRef} 
            ></div>
            <div className="monthSelector"
                ref={monthRef}
                onScroll={checkSelectedItem}
            >
                <ul>
                    {monthsArr.map(month => {
                        return <li key={month}>{month}</li>
                    })}
                </ul>
            </div>
            <div className="yearSelectorOverlay"
                ref={yearOverlayRef}
            ></div>
            <div className="yearSelector"
                ref={yearRef}
                onScroll={checkSelectedItem}
            >
                <ul>
                    {yearsArr.map(year => {
                            return <li key={year}>{year}</li>
                    })}   
                </ul>      
            </div>
        </div>
        <Button 
            variant="update" 
            onClick={handleSelectMonthYear}
            color="#05AAFF"
            btnDimensions={{
                width: 6,
                height: 2
            }}
        >Select</Button>
    </div>
};