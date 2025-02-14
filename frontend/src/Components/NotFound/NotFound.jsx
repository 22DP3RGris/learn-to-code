import './NotFound.css';
import React from "react";
import Header from '../Header/Header.jsx';
import SidePanel from '../SidePanel/SidePanel.jsx';
import { useLocation} from 'react-router-dom';

function NotFound() {
    const location = useLocation();
    return (
        <div className="notfound">
            <Header/>
            <div className='content'>
                <SidePanel/>
                <div className='main-container'>
                    <div className="notfound-container">
                        <div>
                            <h2>404 Not Found</h2>
                            <p id='notfound-msg'>The page "{location.pathname}" could not be found.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;