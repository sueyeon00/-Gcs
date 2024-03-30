import React, { useState, useEffect } from 'react';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import './MapMode.css'

const MapMode = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [folderNames, setFolderNames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setFolderNames(await window.electronAPI.getMapModeFolderNames())
        }
        fetchData()
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCheckboxClick = (event) => {
        event.stopPropagation(); // 이벤트 버블링(stop event bubbling)
    };

    return (
        <>
            <div className="custom-map-button" onClick={toggleMenu} style={{ position: 'absolute', top: 35, left: 10 }}>
                <MapRoundedIcon />
                
                {isMenuOpen && (
                    <div className="dropdown-content" style={{ position: 'absolute', top: 41, left: 0, backgroundColor: 'white' }}>
                        {folderNames.map((folderName, index) => (
                            <div className="menu-item" key={index}>
                                <input type="checkbox" id={`menu${index + 1}`} name={`menu${index + 1}`} onClick={handleCheckboxClick}/>
                                <label htmlFor={`menu${index + 1}`}>{folderName}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </>
    );
};

export default MapMode;
