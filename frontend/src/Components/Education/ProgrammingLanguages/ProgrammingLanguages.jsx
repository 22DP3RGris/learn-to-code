import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import './ProgrammingLanguages.css';
import Header from '../../Header/Header.jsx';
import SidePanel from "../../SidePanel/SidePanel.jsx";

function ProgrammingLanguages() {
    const { user, token } = useStateContext();
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/programming-languages')
            .then(({ data }) => {
                setLanguages(data);
                setLoading(false);
                languages.forEach(language => console.log(language));
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="programming-languages">
            <Header />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    <div className="choose-language">
                        <h1>Choose a programming language</h1>
                    </div>
                    <div className="language-list">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {languages.map((language) => (
                                    <li key={language.id} className="language-item">
                                        <img
                                            src={language.image}
                                            alt={language.name}
                                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                        />
                                        <span>{language.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgrammingLanguages;
