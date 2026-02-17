export function numOfDaysInMonth(monthIndex: number = new Date().getMonth(), year:number = new Date().getFullYear()): number{
    // const date = new Date(`${monthName} 1, ${year}`);
    return new Date(year, monthIndex + 1, 0).getDate();
}