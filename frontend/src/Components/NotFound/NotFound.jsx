import './NotFound.css';
import React from "react";
import Header from '../Header/Header.jsx';
import { useLocation} from 'react-router-dom';

function NotFound() {
    const location = useLocation();
    return (
        <div id="notfound">
            <Header/>
            <div className="container">
                <div>
                    <h2>404 Not Found</h2>
                    <p id='notfound-msg'>The page "{location.pathname}" could not be found.</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;