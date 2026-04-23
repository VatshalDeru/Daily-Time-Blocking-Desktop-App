/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const electron = require('electron');
const client = require('./database')

electron.contextBridge.exposeInMainWorld("electron", {
    getTasks: () => {
        return;
    }
})