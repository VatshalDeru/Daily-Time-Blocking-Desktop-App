// gets the hour and period (e.g. AM or PM) from a Date object
const getHoursAndPeriod = (date: Date) =>{
    let hours = date.getHours()
    const period = hours < 12 ? "AM" : "PM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; 
    return {
        hours,
        period
    }  
};

// formats a date object to a presentable time in the format of hh:mm PM/AM
export const formatTime = (date: Date) => {
    const { hours, period } = getHoursAndPeriod(date);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return {
        hours,
        minutes,
        period
    }
};

export const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    })
}; 