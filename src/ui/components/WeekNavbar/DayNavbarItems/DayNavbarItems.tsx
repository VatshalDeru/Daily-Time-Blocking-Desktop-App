type DayNavbarItemsProps = {
    dayName?: string;
    dayNumber?: number;
};

export default function DayNavbarItems({ dayName, dayNumber }: DayNavbarItemsProps) {
    return <div className="dayNavbarItem">
        <div className="dayName">
            <p>{dayName ?? "Sun"}</p>
        </div>
        <div className="dayNumber">
            <p>{dayNumber ?? 12}</p>
        </div>
    </div>
};