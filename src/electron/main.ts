import { app, BrowserWindow } from 'electron';
import { testConnection } from './database.js';
import { isDev } from './util.js';
import path from "path";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });
    if(isDev()) {
        mainWindow.loadURL("http:localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    };
    testConnection();
});
