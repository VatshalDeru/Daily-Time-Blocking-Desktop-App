type DayNavbarItemsProps = {
    dayName?: string;
    dayNumber?: number;
    selected: boolean;
};

export default function DayNavbarItems({ dayName, dayNumber, selected }: DayNavbarItemsProps) {
    return <div className={`dayNavbarItem ${selected && "selected"}`}>
        <div className="dayName">
            <p>{dayName ?? "Sun"}</p>
        </div>
        <div className="dayNumber">
            <p>{dayNumber ?? 12}</p>
        </div>
    </div>
};