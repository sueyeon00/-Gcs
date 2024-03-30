const { ipcMain } = require('electron/main')
const xml2js = require('xml2js');
const fs = require('fs');

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

    ipcMain.handle('getMapModeFolderNames', async () => {
        const mapModefolderNames = await makeMapModeFolderNames();
        return mapModefolderNames;
    });
}

async function makeMapModeFolderNames() {
    // KML 파일 경로
    const kmlFilePath = 'doc.kml';

    // KML 데이터를 JSON으로 파싱하는 함수
    function parseKMLData() {
        return new Promise((resolve, reject) => {
            fs.readFile(kmlFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading KML file:', err);
                    reject(err);
                    return;
                }
                xml2js.parseString(data, (err, result) => {
                    if (err) {
                        console.error('Error parsing KML data:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }

    // KML 데이터에서 폴더 이름을 추출하는 함수
    async function extractFolderNames(kmlData) {
        const folderNames = [];
        // Folder 태그 안에 있는 폴더 이름 추출
        const folders = kmlData.kml.Document[0].Folder;
        folders.forEach(folder => {
            const name = folder.name[0];
            folderNames.push(name);
        });
        return folderNames;
    }

    try {
        const kmlData = await parseKMLData();
        const folderNames = await extractFolderNames(kmlData);
        return folderNames;
    } catch (error) {
        console.error('Error making map mode folder names:', error);
        return [];
    }
}

module.exports = activateEventHandler;
