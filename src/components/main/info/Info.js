import { useState } from 'react';

import './Info.css'
import DroneState from "./compss/DroneState.js";


export default function Info() {

    return (
        <div className='Info'>
            <DroneState/>
            
            {/* <Etc/> */}
        </div>
    )
}