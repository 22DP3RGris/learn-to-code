import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Header from "../../Header/Header";
import SidePanel from "../../SidePanel/SidePanel";
import Loading from "../../Loading/Loading.jsx";

import "./Topics.css";

function Topics() {
    const { name } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (name) {
            axiosClient.get(`/programming-languages/${name}/topics`)
                .then(({ data }) => {
                    setTopics(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [name]);

    return (
        <div className="topics-page">
            <Header />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    <div className="topics-list">
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <ul className="container">
                                    <div className="choose-topic">
                                        <h1>Choose a topic</h1>
                                    </div>
                                    {topics.map(topic => (
                                        <li
                                            key={topic.id}
                                            className="topic-item"
                                            onClick={() => navigate(`/topics/${topic.id}/theory`)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="topic-info">
                                                <span className="topic-title">{topic.title}</span>
                                                <p className="topic-description">{topic.description}</p>
                                                <span className={`topic-difficulty ${topic.difficulty}`}>Difficulty: {topic.difficulty}</span>
                                                <span className="topic-theory-size">Section count: {topic.theory_size}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topics;
