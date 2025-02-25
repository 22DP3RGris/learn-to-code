import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import './ProgrammingLanguages.css';
import Header from '../../Header/Header.jsx';
import SidePanel from "../../SidePanel/SidePanel.jsx";

function ProgrammingLanguages() {
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
                    
                </div>
            </div>
        </div>
    );
}

export default ProgrammingLanguages;