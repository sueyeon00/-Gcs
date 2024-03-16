// MapMode.js (클라이언트 측)

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 사용하여 HTTP 요청을 보냄

const MapMode = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [folderNames, setFolderNames] = useState([]);


    useEffect(() => {
        // 서버에서 폴더 이름을 가져오는 함수 호출
        fetchFolderNames();
    }, []);

    // 서버에서 폴더 이름을 가져오는 함수
    const fetchFolderNames = async () => {
        try {
            const response = await axios.get('/api/folderNames'); // 서버의 API 엔드포인트 호출
            setFolderNames(response.data); // 받은 데이터로 상태 업데이트
        } catch (error) {
            console.error('Error fetching folder names:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="custom-map-button" onClick={toggleMenu} style={{ position: 'absolute', top: 35, left: 10 }}>
                Map Mode
            </div>
            {isMenuOpen && (
                <div className="dropdown-content" style={{ position: 'absolute', top: 75, left: 10, backgroundColor: 'white' }}>
                    {folderNames.map((folderName, index) => (
                        <div className="menu-item" key={index}>
                            <input type="checkbox" id={`menu${index + 1}`} name={`menu${index + 1}`} />
                            <label htmlFor={`menu${index + 1}`}>{folderName}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MapMode;
