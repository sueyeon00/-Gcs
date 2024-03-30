// Home.js
import React from 'react';
import './Home.css';
import MapMode from './comps/mapMode/MapMode.js';
import GoogleMap from './comps/googleMap/GoogleMap.js';

const Home = () => {
    return (
        <div className='Home'>
            <GoogleMap />
            <MapMode /> 
        </div>
    );
};

export default Home;
