const fs = require('fs');
const xml2js = require('xml2js');
const express = require('express');

const app = express();

// KML 파일 경로
const kmlFilePath = 'doc.kml';

// KML 데이터를 JSON으로 파싱
xml2js.parseString(data, (err, result) => {
    if (err) {
        console.error('Error parsing KML data:', err);
        return;
    }
    const kmlData = result; // kmlData 변수에 파싱된 결과를 할당
    // 폴더 이름을 추출하여 클라이언트로 전송
    const folderNames = extractFolderNames(kmlData);
    sendFolderNamesToClient(folderNames);
});


// 서버에 GET 요청이 오면 KML 파일을 읽고 데이터를 파싱하여 폴더 이름을 응답합니다.
app.get('/folderNames', (req, res) => {
    fs.readFile(kmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading KML file:', err);
            res.status(500).send('Error reading KML file');
            return;
        }
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Error parsing KML data:', err);
                res.status(500).send('Error parsing KML data');
                return;
            }
            const folderNames = extractFolderNames(result);
            res.json(folderNames);
        });
    });
});

// 클라이언트로부터 폴더 이름을 받으면 해당 폴더의 내용을 응답합니다.
app.get('/folderContent/:folderName', (req, res) => {
    const folderName = req.params.folderName;
    // 해당 폴더의 내용을 읽는 코드 작성
    // 읽은 내용을 클라이언트에게 응답
});

// KML 데이터에서 폴더 이름을 추출하는 함수
const extractFolderNames = (kmlData) => {
    const folderNames = [];
    // KML 데이터 구조를 분석하여 폴더 이름을 추출하는 로직을 작성합니다.
    // 예를 들어, KML 데이터의 특정 위치에서 폴더 이름을 찾고 배열에 추가합니다.
    // 폴더 이름을 추출한 후에는 다음과 같이 folderNames 배열에 추가합니다.
    // folderNames.push('폴더 이름');
    return folderNames;
};

// 추출한 폴더 이름을 클라이언트로 전송하는 함수
const sendFolderNamesToClient = (folderNames) => {
    // 여기에 폴더 이름을 클라이언트로 전송하는 로직을 작성합니다.
};

// 클라이언트로부터 폴더 이름을 요청받아 반환하는 함수
const getFolderNames = () => {
    // 폴더 이름을 추출하는 로직을 호출하여 폴더 이름을 반환합니다.
    const kmlData = {}; // 실제 KML 데이터를 여기에 할당해야 합니다.
    return extractFolderNames(kmlData);
};

module.exports = {
    getFolderNames
};

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
