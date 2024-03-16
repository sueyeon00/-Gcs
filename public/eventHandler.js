const { ipcMain } = require('electron/main')

function activateEventHandler(mainWindow) {

    ipcMain.on('minimizeMainWindow', () => {
        mainWindow.minimize()
    })

    ipcMain.on('maximizeMainWindow', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })

    ipcMain.on('closeMainWindow', () => {
        mainWindow.close()
    })

}

module.exports = activateEventHandler