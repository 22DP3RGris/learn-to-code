import React from "react";
import "./TopicRequests.css";
import axiosClient from "../../axios-client.js";

function TopicRequestsList({ requests, setRequests, refreshRequests }) {
    const handleApprove = async (id) => {
        try {
            await axiosClient.put(`/topic-change-requests/${id}/approve`);
            alert("Topic request approved!");
            refreshRequests();
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosClient.delete(`/topic-change-requests/${id}/reject`);
            alert("Topic request rejected!");
            refreshRequests();
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    return (
        <div className="user-table">
            <div className="dashboard-header">
                <h2>Topic Change Requests</h2>
            </div>
            {requests.length === 0 ? (
                <p className="message">No topic change requests.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th>Language</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.title}</td>
                                <td style={{ maxWidth: "250px", whiteSpace: "pre-wrap" }}>{request.description}</td>
                                <td>{request.difficulty}</td>
                                <td>{request.status}</td>
                                <td>{request.language?.name || "Unknown"}</td>
                                <td>{request.user?.username || "Unknown"}</td>
                                <td>
                                    <button onClick={() => handleApprove(request.id)}>Approve</button>
                                    <button onClick={() => handleReject(request.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TopicRequestsList;
