// Home.js
import MapComponent from './GoogleMap';
import MapMode from './MapMode';
import React from 'react';
import './Home.css';
import GoogleMap from './GoogleMap';

const Home = () => {
    return (
        <div className='Home'>
            <GoogleMap />
            <MapMode /> 
        </div>
    );
};

export default Home;
