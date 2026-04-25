import { Client } from 'pg';

export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'time_blocking_app',
    password: '#Future10151',
    port: 5432,
});

export const testConnection = async () => {
    try {
        await client.connect();
        console.log("Connected To DB");
        // await client.query("SELECT ")
        // await client.end();
    } catch (error) {
        console.log("Connection to DB failed", error);
    }
};

export const fetchUserData = async () => {
    try {
        const userData = await client.query("SELECT * FROM users");
        console.log(userData.rows);
    } catch (error) {
        console.log("Error getting user data: ", error)
    }
};

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
// export client;
// testConnection();