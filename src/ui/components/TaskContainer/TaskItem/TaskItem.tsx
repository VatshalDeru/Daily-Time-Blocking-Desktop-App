type TaskItemsProps = {
    icon: React.ReactNode;
    taskName?: string;
    taskTime?: Date;
    taskDuration?: number;
};

export default function TaskItem({ icon }: TaskItemsProps) {
    return <div className="taskItem">
        <div className="taskInfo">
            <p className="leftTime">08:00</p>
            <div className="taskIconContainer">
                {icon}
            </div>
            <div className="titleTimeContainer">
                <p className="topTime">08:00</p>
                <h2>Wake up</h2>
            </div>
        </div>
        <button className="checkBox">
        </button>
    </div>
}