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

// export const saveTaskDate = async (taskData) => {
//     try {
//         await client.query(`INSERT INTO tasks ()`)
//     } catch (error) {
//         console.error("Error saving task: ", error)
//     }
// };
// export client;
// testConnection();