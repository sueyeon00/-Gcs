const { app, session, BrowserWindow } = require('electron/main')
const path = require('node:path')

// React 개발서버 사용을 위한 설정
const remote = require('@electron/remote/main')
remote.initialize()

// 이벤트 핸들러 모음 시작
const activateEventHandler = require('./eventHandler.js');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    activateEventHandler(mainWindow)

    // React 개발서버 사용을 위한 설정
    remote.enable(mainWindow.webContents)

    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()

}


app.whenReady().then(() => {
    createMainWindow()

    // const filter = {
    //     urls: ['https://maps.googleapis.com/*']
    // };

    // session.defaultSession.webRequest.onBeforeSendHeaders(
    //     filter,
    //     (details, callback) => {
    //         console.log(details);
    //         details.requestHeaders['Origin'] = 'https://maps.googleapis.com';
    //         callback({ requestHeaders: details.requestHeaders });
    //     }
    // );

    // session.defaultSession.webRequest.onHeadersReceived(
    //     filter,
    //     (details, callback) => {
    //         console.log(details);
    //         details.responseHeaders['Access-Control-Allow-Origin'] = [
    //             'capacitor-electron://-'
    //         ];
    //         callback({ responseHeaders: details.responseHeaders });
    //     }
    // );

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            app.quit()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})