/* eslint-disable @typescript-eslint/no-require-imports */

import { contextBridge, ipcRenderer } from 'electron';
import { updateTask } from './tasks';


contextBridge.exposeInMainWorld('electron', {
    saveTask: async (task: Object) => {
        return await ipcRenderer.invoke('save-task', task);
    },
    fetchTasks: async (date: string) => {
        return await ipcRenderer.invoke('fetch-tasks', date);
    },
    checkTaskTimeOverlaps: async  (date: Date, duration: number) => {
        return await ipcRenderer.invoke('tasks:has-time-overlap', date, duration);
    },
    updateTask: async (task: Object) => {
        return await ipcRenderer.invoke('update-task', task);
    },
    deleteTask: async (taskId: number) => {
        return await ipcRenderer.invoke('delete-task', taskId);
    }
});