const { contextBridge, ipcRenderer } = require('electron')

const WINDOW_API: any = {
    newWindow: () => ipcRenderer.send('newWindow', 'hi'),
    closeNote: () => ipcRenderer.send('closeNote', 'hi')
}

contextBridge.exposeInMainWorld('api', WINDOW_API)