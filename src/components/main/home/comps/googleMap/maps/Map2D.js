import React, { useEffect, useState } from 'react';
import { uploadMarkerLocation } from '../../../../../../firebase_utils';

const Map2D = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const loadMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzJkRERFGrWrtkDracXrW0TRYUfq_yO1w&libraries=places`;
            script.async = true;
            script.onload = () => {
                setMapLoaded(true);
            };
            document.head.appendChild(script);
        };
        loadMapScript();
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            loadMap();
        }
    }, [mapLoaded]);

    const loadMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 35.1540, lng: 128.0928 },
            zoom: 15,
            rotateContral: true,
            mapTypeId: 'satellite', // 위성보기를 기본값으로 설정
            mapTypeControl: false, // 지도/위성 전환 버튼 숨기기
            streetViewControl: false // 스트리트뷰 버튼 숨기기
        });

        // 클릭 이벤트 처리
        map.addListener('click', async (event) => {
            const marker = placeMarker(event.latLng, map);
            await generateMarkerInfo(marker, map);
        });
    };

    const placeMarker = (location, map) => {
        const marker = new window.google.maps.Marker({
            position: location,
            map: map
        });

        // 마커를 클릭하여 삭제하는 기능 추가
        marker.addListener('click', () => {
            marker.setMap(null); // 마커를 지도에서 제거
        });

        return marker;
    };

    const generateMarkerInfo = async (marker, map) => {
        const contentString = `
            <div>
                위도: ${marker.getPosition().lat()}
            </div>
            <div>
                경도: ${marker.getPosition().lng()}
            </div>
            <button id=${marker.getPosition().lat()}>
                위치 업로드
            </button>
        `;
        const infoWindow = new window.google.maps.InfoWindow({
            content: contentString
        });
    
        infoWindow.open(map, marker);
    
        // Event listener to wait for the content to be rendered
        window.google.maps.event.addListener(infoWindow, 'domready', () => {
            const uploadBtn = document.getElementById(`${marker.getPosition().lat()}`);
            uploadBtn.addEventListener('click', () => {
                const latitude = marker.getPosition().lat();
                const longitude = marker.getPosition().lng();
                uploadMarkerLocation(latitude, longitude);
                console.log(1); // This should log when the button is clicked
            });
        });
    
        return infoWindow;
    };
    
    return <div id='map' style={{ width: '100%', height: '100%', left: 0 }}></div>;
};

export default Map2D;

