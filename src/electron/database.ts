import { Client } from 'pg';

const client = new Client({
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
        await client.end();
    } catch (error) {
        console.log("Connection to DB failed", error);
    }
};

// testConnection();