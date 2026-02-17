import { useRef } from "react";

export default function MonthYearSelectorModal() {
    const monthsArr: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const yearsArr: number[] = [2026, 2025, 2024, 2023, 2022, 2021]
    
    const monthRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const monthOverlayRef = useRef<HTMLDivElement>(null);
    const yearOverlayRef = useRef<HTMLDivElement>(null);

    const currentSelectedMonth = useRef<string | null>(null);
    const currentSelectedYear = useRef<string | null>(null);
    const scrollTimeout= useRef<ReturnType<typeof setTimeout>>(null);
    function checkSelectedItem() {
        if(scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
            // return;
        };
        // console.log(scrollTimeout)

        

        scrollTimeout.current = setTimeout(() => {
            let newSelectedMonth: string | null = null;
            let newSelectedYear: string  | null = null;
            const monthOverlayRect = monthOverlayRef.current?.getBoundingClientRect();
            const monthItems = monthRef.current?.querySelectorAll('li');
    
            if (monthOverlayRect && monthItems) {
                monthItems.forEach(item => {
                    const itemRect = item.getBoundingClientRect();
                    const isSelected =
                        itemRect.top <= monthOverlayRect.top + monthOverlayRect.height / 2 &&
                        itemRect.bottom >= monthOverlayRect.top + monthOverlayRect.height / 2;
    
    
                    if (isSelected){
                        newSelectedMonth = item.textContent;
                        item.classList.add('selected')
                    } else {
                        item.classList.remove('selected')
                    };
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
    
                    if (isSelected){
                        newSelectedYear = item.textContent;
                        item.classList.add('selected')
                    } else {
                        item.classList.remove('selected')
                    };

                    item.classList.toggle("selected", isSelected)
                });
            }


            // Only update the current selected refs if it changed
            if (currentSelectedMonth.current !== newSelectedMonth) {
                currentSelectedMonth.current = newSelectedMonth;
                // console.log("Confirmed selected month:", newSelectedMonth);
            }

            if (currentSelectedYear.current !== newSelectedYear) {
                currentSelectedYear.current = newSelectedYear;
                // console.log("Confirmed selected year:", newSelectedYear);
            }

            scrollTimeout.current = null;
        }, 10)
    }


    return <div className="monthYearSelectorModalContainer">
        <div 
            className="monthSelectorOverlay"
            ref={monthOverlayRef} 
        ></div>
        <div 
            className="monthSelector"
            ref={monthRef}
            onScroll={checkSelectedItem}
        >
            <ul>
                {monthsArr.map(month => {
                    return <li key={month}>{month}</li>
                })}
            </ul>
        </div>
        <div 
            className="yearSelectorOverlay"
            ref={yearOverlayRef}
        ></div>
        <div 
            className="yearSelector"
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
};