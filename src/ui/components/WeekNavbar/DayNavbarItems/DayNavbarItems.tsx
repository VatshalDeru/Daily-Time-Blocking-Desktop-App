type DayNavbarItemsProps = {
    dayName?: string;
    dayNumber?: number;
    selected: boolean;
    onClick: () => void;
};

export default function DayNavbarItems({ dayName, dayNumber, selected, onClick }: DayNavbarItemsProps) {
    return <div className={`dayNavbarItem ${selected && "selectedDay"}`} onClick={onClick}>
        <div className="dayName">
            <p>{dayName ?? "Sun"}</p>
        </div>
        <div className="dayNumber">
            <p>{dayNumber ?? 12}</p>
        </div>
    </div>
};