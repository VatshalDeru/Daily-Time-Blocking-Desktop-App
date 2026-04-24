import { app, BrowserWindow } from 'electron';
import { testConnection, fetchUserData} from './database.js';
import { isDev } from './util.js';
import path from "path";
import { getPreloadPath } from './pathResolver.js';
import { error } from 'console';

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
});
