import { client } from "./database.js";

type taskDataType = {
    taskId: number,
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
        console.error("Error fetching task: ", error)
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
        console.error("Error checking for time overlap: ", error)
    }
}

export const updateTask = async (taskChanges: Partial<taskDataType>) => {
    try {
        const taskChangesMap: Record<string, string> = {
            date: 'task_date'
        }

        // filtering to get rid of the task id
        const entries = Object.entries(taskChanges)
            .filter(([key]) => key !== 'taskId')

        // dynamically building the set clause here (we're adding $1, $2.... etc instead actual values to avoid sql injection )
        const setClause = entries.map(([key], i) => {
                const taskField = taskChangesMap[key] || key;
                return `${taskField} = $${i+1}`
            }).join(",\r\n");

        // creating an array of the values that have changed
        const values = entries.map(([_, values]) => values)

        await client.query(`
            UPDATE tasks
            SET ${setClause}
            WHERE id = $${entries.length + 1}
        `, [...values, taskChanges.taskId]);
        // doing entries.length + 1 because we dont know how many values have been changed, so we're calculating it dynamically
    } catch (error) {
        console.error("Error saving task: ", error)
    }
};

export const deleteTask = async (taskId: number) => {
    console.log('task_id:',taskId)
    try {
        await client.query(`
            DELETE FROM tasks
            WHERE id = $1
        `, [taskId])
    } catch (error) {
        console.error("Error deleting task: ", error)
    }
}