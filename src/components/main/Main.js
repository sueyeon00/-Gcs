import { useState } from 'react';

import './Main.css'
import Home from "./home/Home.js";
import Info from "./info/Info.js"

export default function Main() {

    return (
        <div className='Main'>
            <Home/>
            <Info/>
            {/* <Etc/> */}
        </div>
    )
}