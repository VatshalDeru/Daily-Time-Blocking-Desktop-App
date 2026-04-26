import { client } from "./database.js";

type taskDataType = {
    icon: string,
    colour: string,
    date: Date,
    duration: number,
    isCompleted: boolean,
    name: string,
    // timeWindow: currTask.timeWindow
}

export const saveTaskData = async (taskData: taskDataType) => {
    console.log(taskData);
    try {
        await client.query(`
            INSERT INTO tasks (name, colour, icon, task_date, duration, is_completed)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [taskData.name, taskData.colour, taskData.icon, taskData.date, taskData.duration, taskData.isCompleted]
        )
        console.log('Successfully created task.')
    } catch (error) {
        console.error("Error saving task: ", error)
    }
};

export const fetchTaskData = async (date: Date) => {
    try {
        const formattedDate =  date.toLocaleDateString('en-CA')

       const tasks =  await client.query(`
            SELECT *
            FROM tasks
            WHERE task_date >= $1
            AND task_date < $1::date + INTERVAL '1 day'`,
            [formattedDate]
        )
        console.log('Successfully fetched task.')
        return tasks.rows;
    } catch (error) {
        console.error("Error saving task: ", error)
    }
}

export const checkTaskTimeOverlaps = async (date: Date, duration: number) => {
    try {
        const endTime = new Date(date.getTime() + duration);

        const overlappingTasks = await client.query(`
            SELECT *
            FROM tasks
            WHERE task_date + duration * INTERVAL '1 millisecond' > $1
            AND task_date < $2`,
        [date, endTime])
        console.log("overlapping tasks: ", overlappingTasks);
        return overlappingTasks.rows;
    } catch (error) {
        console.error("Error saving task: ", error)
    }
}