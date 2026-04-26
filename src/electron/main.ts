import { app, BrowserWindow, ipcMain } from 'electron';
import { testConnection, fetchUserData, saveTaskData } from './database.js';
import { isDev } from './util.js';
import path from "path";
import { getPreloadPath } from './pathResolver.js';
import { error } from 'console';
import { checkTaskTimeOverlaps, fetchTaskData } from './tasks.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: getPreloadPath()
        }
    });
    if(isDev()) {
        mainWindow.loadURL("http:localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    };

    testConnection()
        .then(fetchUserData)
        .catch(err => console.error(err));

    // ipcMain.handle("save-task", async (event, taskData) => {
    //     try {
    //         await saveTaskData(taskData);
    //         return { success: true }
    //     } catch (error) {
    //         console.error('Error saving task:', error);
    //         return { success: false, error: error.message };
    //     }
    // })

    // saves tasks to db
    ipcMain.handle("save-task", async (_, task) => {
        console.log(task);
        const response = await saveTaskData(task);
        console.log(response);
        return response;
    })

    // fetches tasks from db
    ipcMain.handle("fetch-tasks", async (_, date) => {
        console.log(date);
        const tasks = await fetchTaskData(date);
        console.log(tasks);
        return tasks;
    })

    // checks if there are any tasks that overlap in time with the time of the task the user is trying to create
    ipcMain.handle('tasks:has-time-overlap', async (_, date, duration) => {
        console.log('date and duration in ipcmain.handle: ', date + ' ' + duration);

        const overlappingTasks = await checkTaskTimeOverlaps(date, duration);
        console.log('overlap response in ipcMain.handle: ', overlappingTasks);

        if(overlappingTasks?.length === 0) return false
        else return true;
    } )
});
