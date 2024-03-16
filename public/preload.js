const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI', {
    minimizeMainWindow: () => ipcRenderer.send('minimizeMainWindow'),
    maximizeMainWindow: () => ipcRenderer.send('maximizeMainWindow'),
    closeMainWindow: () => ipcRenderer.send('closeMainWindow')
})
