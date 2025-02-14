import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import './News.css';
import Header from '../Header/Header.jsx';
import SidePanel from "../SidePanel/SidePanel.jsx";

function News() {
    const {user, token} = useStateContext();
    if (!token){
        return <Navigate to="/login"/>;
    }
    return (
        <div className="news">
            <Header/>
            <div className="content">
                <SidePanel/>
                <div className="main-container">
                    <div className="container">
                        <h2>Jaunumi!</h2>
                        <div className="news-container">
                            <div className="news-item">
                                <h3>Work in progress</h3>
                                <p>Work in progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;