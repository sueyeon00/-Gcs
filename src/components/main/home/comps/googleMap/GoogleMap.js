import React, { useState } from 'react';
import Map2D from './maps/Map2D';
import Map3D from './maps/Map3D';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import './GoogleMap.css';

const GoogleMap = () => {
    const [mapType, setMapType] = useState('2D');

    const handleChange = (event, newMapType) => {
        setMapType(newMapType);
    };

    return (
        <div style={{  display: 'flex', justifyContent: 'flex-start', position: 'relative',width: '50%', height: '100%'}}>
            <ToggleButtonGroup
                color="primary"
                value={mapType}
                exclusive
                onChange={handleChange}
                aria-label="Map Type"
                style={{ position: 'absolute', top: '10px', left: '35%', zIndex: '1000' }}
            >
                <ToggleButton value="2D">2D</ToggleButton>
                <ToggleButton value="3D">3D</ToggleButton>
            </ToggleButtonGroup>
            {mapType === '2D' ? <Map2D /> : <Map3D />}
        </div>
    );
};

export default GoogleMap;
