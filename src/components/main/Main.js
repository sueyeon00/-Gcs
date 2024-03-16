import { useState } from 'react';

import './Main.css'
import Home from "./pages/home/Home.js";

export default function Main() {
    const [currentPage, setCurrentPage] = useState('Home')

    let pageSellector = {
        'Home' : <Home/>
    }

    return (
        <div className='Main'>
            <div className='Page'>
                {pageSellector[currentPage]}
            </div>
        </div>
    )
}