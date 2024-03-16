
import React, { useEffect, useState } from 'react';
//import MapMode from './MapMode';
import './Home.css';

const GoogleMap = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    

    useEffect(() => {
        const loadMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3tmBlB73RIqNb1EEU5wHlL-mWeg3Nscs&libraries=places`;
            script.async = true;
            script.onload = () => {
                setMapLoaded(true);
            };
            document.body.appendChild(script);
        };

        loadMapScript();
    }, []);

    const loadMap = () => {
        if (mapLoaded) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 35.1540, lng: 128.0928 },
                zoom: 15, 
                mapTypeId: 'satellite', // 위성보기를 기본값으로 설정
                mapTypeControl: false, // 지도/위성 전환 버튼 숨기기
                streetViewControl: false // 스트리트뷰 버튼 숨기기
            });
            map.setOptions({styles: {height: '50vh', width: '100%', position: 'absolute', top: 0}});

            
        }
    };
    useEffect(() => {
        loadMap();
    }, [mapLoaded]);
    return (
        <div id='map' style={{ width: '100%', height: '60vh', position: 'relative' }}></div>
    )

};

export default GoogleMap;