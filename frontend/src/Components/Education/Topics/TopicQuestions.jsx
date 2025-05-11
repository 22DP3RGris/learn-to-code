import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Header from "../../Header/Header";
import SidePanel from "../../SidePanel/SidePanel";
import Loading from "../../Loading/Loading.jsx";
import "./TopicQuestions.css";

function TopicQuestions() {
    const { topicId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [questionStatuses, setQuestionStatuses] = useState({});

    const currentQuestion = questions?.data?.[0];

    useEffect(() => {
        fetchQuestions();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [topicId, currentPage]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
        const { data } = await axiosClient.get(
            `/topics/${topicId}/questions?page=${currentPage}`
        );
        setQuestions(data);
        const submissionStatus = await fetchSubmissionStatus(data.data);
        setQuestionStatuses(submissionStatus);
        resetState();
        } catch (err) {
        console.error("Failed to load questions:", err);
        } finally {
        setLoading(false);
        }
    };

    const fetchSubmissionStatus = async (questions) => {
        const statuses = {};
        for (const question of questions) {
            try {
                const response = await axiosClient.get(
                    `/questions/${question.id}/submission-status`
                );
                statuses[question.id] = response.data.is_answered
                    ? response.data.is_correct ? "1/1" : "0/1"
                    : "0/1";
            } catch (error) {
                console.error("Error fetching submission status:", error);
            }
        }
        return statuses;
    };

    const resetState = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        setSubmitted(false);
        setIsCorrect(false);
    };

    const handleSubmit = async () => {
        if (!selectedAnswer || (submitted && isCorrect)) return;

        try {
        const response = await axiosClient.post(
            `/questions/${currentQuestion.id}/submit`,
            {
            programming_question_id: currentQuestion.id,
            programming_answer_id: selectedAnswer,
            }
        );

        const correct = response.data.correct;
        if (correct) {
            setQuestionStatuses((prev) => ({
            ...prev,
            [currentQuestion.id]: "1/1",
            }));
        }
        setIsCorrect(correct);
        setFeedback(correct ? "Correct!" : "Incorrect. Try again.");
        setSubmitted(true); 
        } catch (err) {
        console.error("Failed to submit answer:", err);
        }
    };

    const goToPage = (delta) => {
        setCurrentPage((prev) => prev + delta);
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
                    <div className="container quiz">
                    <h2>Quiz</h2>

                    {currentQuestion ? (
                        <div className="question-block">
                        <p className="status">
                            Points:
                            {" " + questionStatuses[currentQuestion.id]}
                        </p>
                        <p>{currentQuestion.question}</p>
                        {currentQuestion.answers.map((a) => (
                            <label key={a.id} className="answer-option">
                            <input
                                type="radio"
                                name={`question-${currentQuestion.id}`}
                                value={a.id}
                                checked={selectedAnswer === a.id}
                                onChange={() => {
                                    setSelectedAnswer(a.id);
                                    setFeedback(null);
                                    setSubmitted(false);
                                }}
                                disabled={submitted && isCorrect} 
                            />
                            {a.answer_text}
                            </label>
                        ))}

                        {feedback && (
                            <p
                            className={`feedback ${
                                isCorrect ? "correct" : "incorrect"
                            }`}
                            >
                            {feedback}
                            </p>
                        )}
                        </div>
                    ) : (
                        <p>No questions available.</p>
                    )}

                    <div className="action-bar">
                        <div className="pagination">
                        <button
                            onClick={() => goToPage(-1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Question {questions.current_page} of {questions.last_page}
                        </span>
                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === questions.last_page}
                        >
                            Next
                        </button>
                        </div>

                        <button
                        onClick={handleSubmit}
                        disabled={!selectedAnswer || (submitted && isCorrect)}
                        className="edit-button"
                        >
                        Submit Answer
                        </button>
                    </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default TopicQuestions;
