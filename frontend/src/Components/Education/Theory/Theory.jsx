import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Header from "../../Header/Header";
import SidePanel from "../../SidePanel/SidePanel";
import Loading from "../../Loading/Loading.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import "highlight.js/styles/github-dark.css";
import "./Theory.css";

function Theory() {
    const { topicId } = useParams();
    const { user } = useStateContext();
    const canEdit = user?.role === "teacher" || user?.role === "admin";

    const [theoryPages, setTheoryPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const fetchTheory = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get(`/topics/${topicId}/theory?page=${currentPage}&per_page=1`);
            setTheoryPages(data);
            if (data?.data?.[0]?.content) {
                setEditedContent(data.data[0].content);
            }
        } catch (error) {
            console.error("Error loading theory:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheory();
    }, [topicId, currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const goToNext = () => {
        if (theoryPages.current_page < theoryPages.last_page) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPrev = () => {
        if (theoryPages.current_page > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const theory = theoryPages?.data?.[0];

    const handleSave = async () => {
        try {
            await axiosClient.post(`/theory/${theory.id}/change-request`, {
                content: editedContent,
                theory_id: theory.id
            });
            alert("Change request submitted for review.");
            setEditMode(false);
        } catch (err) {
            console.error("Failed to submit change request:", err);
        }
    };

    return (
        <div className="theory-page">
            <Header />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="container">
                            {theory ? (
                                <div>
                                    <h2>{theory.title}</h2>

                                    {editMode ? (
                                        <div>
                                            <textarea
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                                rows={20}
                                                className="edit-textarea"
                                            />
                                        </div>
                                    ) : (
                                        <div className="markdown-body">
                                            <ReactMarkdown
                                                children={theory.content}
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                            />
                                        </div>
                                    )}

                                    <div className="action-bar">
                                        <div className="edit-buttons">
                                            {editMode ? (
                                                <>
                                                    <button className="edit-button" onClick={handleSave}>
                                                        Save
                                                    </button>
                                                    <button
                                                        className="edit-button cancel-button"
                                                        onClick={() => setEditMode(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                canEdit && (
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => setEditMode(true)}
                                                    >
                                                        Edit
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <div className="pagination">
                                            <button onClick={goToPrev} disabled={currentPage === 1}>
                                                Previous
                                            </button>
                                            <span>
                                                Page {theoryPages.current_page} of {theoryPages.last_page}
                                            </span>
                                            <button
                                                onClick={goToNext}
                                                disabled={currentPage === theoryPages.last_page}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Theory content is not available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Theory;
