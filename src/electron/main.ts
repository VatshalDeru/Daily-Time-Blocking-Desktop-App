import { app, BrowserWindow, ipcMain } from 'electron';
import { testConnection, fetchUserData, saveTaskData } from './database.js';
import { isDev } from './util.js';
import path from "path";
import { getPreloadPath } from './pathResolver.js';
import { error } from 'console';
import { fetchTaskData } from './tasks.js';

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

    ipcMain.handle("save-task", async (event, task) => {
        console.log(task);
        const response = await saveTaskData(task);
        console.log(response);
        return response;
    })

    ipcMain.handle("fetch-tasks", async (event, date) => {
        console.log(date);
        const response = await fetchTaskData(date);
        console.log(response);
        return response;
    })
});
