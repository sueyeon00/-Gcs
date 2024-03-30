import React, { useEffect, useState, useRef } from 'react';

const Map3D = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);


  useEffect(() => {
    const loadMapScript = () => {
      if (document.createElement('script')) {
        const originScript = document.createElement('script');
        originScript.remove();
      }
      const apiScript = document.createElement('script');
      apiScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzJkRERFGrWrtkDracXrW0TRYUfq_yO1w&libraries=geometry,places&callback=initMap`;
      apiScript.defer = true;
      apiScript.async = true;
      apiScript.onload = () => {
        setMapLoaded(true);
      }
      document.head.appendChild(apiScript);
    };
    loadMapScript();
  }, []);

  useEffect(() => {
    if (mapLoaded) {
        loadMap();
    }
  }, [mapLoaded]);


  const loadMap = () => {
    const mapOptions = {
      tilt: 45,
      heading: 0,
      zoom: 18,
      center: { lat: 35.1594945, lng: 128.6999859 },
      mapId: 'ffd48b506caf788f',
      streetViewControl: false
    };
    const mapDiv = document.getElementById('map');
    
    const map = new window.google.maps.Map(mapDiv, mapOptions);
    
    
    // 마우스 휠 이벤트에 따라 tilt 값 조정
    const handleWheelEvent = (event) => {
      // event.deltaY 값이 음수면 마우스 휠을 아래로 내리는 것이므로 tilt 값을 감소시킵니다.
      // event.deltaY 값이 양수면 마우스 휠을 위로 올리는 것이므로 tilt 값을 증가시킵니다.
      map.setTilt(map.getTilt() - event.deltaY);
    };

    // 마우스 휠 이벤트 리스너 등록
    mapRef.current.addEventListener('wheel', handleWheelEvent);

    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      mapRef.current.removeEventListener('wheel', handleWheelEvent);
    };
  }

  return <div ref={mapRef} id="map" style={{ width: '100%', height: '100%', left: 0 }}></div>;
};

export default Map3D;
