import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Header from "../../Header/Header";
import SidePanel from "../../SidePanel/SidePanel";
import Loading from "../../Loading/Loading.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

import "./Topics.css";

function Topics() {
    const { name } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newTopic, setNewTopic] = useState({
        title: "",
        description: "",
        difficulty: "beginner",
        status: "NEW",
    });

    const { user } = useStateContext();
    const canEdit = user?.role === "teacher" || user?.role === "admin";
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

    const handleRequestTopic = async () => {
        try {
            console.log("Requesting topic:", newTopic);
            await axiosClient.post(`/programming-languages/${name}/change-requests`, {
                ...newTopic,
            });

            setShowNewForm(false);

            setNewTopic({ title: "", description: "", difficulty: "beginner", status: "NEW" });

            alert("Topic request submitted and is pending approval.");
        } catch (error) {
            console.error("Failed to request topic:", error);
        }
    };


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
                                    <div className="add-topic">
                                        {canEdit && (
                                            <button className="edit-button" onClick={() => setShowNewForm(true)}>
                                                Add New Topic
                                            </button>
                                        )}
                                    </div>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showNewForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Topic</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTopic.title}
                            onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                            className="new-title-input"
                        />
                        <textarea
                            placeholder="Description"
                            value={newTopic.description}
                            onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                            rows={4}
                            className="edit-textarea"
                        />
                        <select
                            value={newTopic.difficulty}
                            onChange={(e) => setNewTopic({ ...newTopic, difficulty: e.target.value })}
                            className="difficulty-select"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                        <div className="edit-buttons">
                            <button className="edit-button" onClick={handleRequestTopic}>Submit</button>
                            <button
                                className="edit-button cancel-button"
                                onClick={() => {
                                    setShowNewForm(false);
                                    setNewTopic({ title: "", description: "", difficulty: "beginner" });
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Topics;
