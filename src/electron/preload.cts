/* eslint-disable @typescript-eslint/no-require-imports */

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    saveTask: async (task: Object) => {
        return await ipcRenderer.invoke('save-task', task);
    },
    fetchTasks: async (date: string) => {
        return await ipcRenderer.invoke('fetch-tasks', date);
    }
});