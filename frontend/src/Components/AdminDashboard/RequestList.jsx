import React from "react";
import axiosClient from "../../axios-client.js";

function RequestsList({ requests, setRequests, refreshRequests }) {

    const approveRequest = (id) => {
        axiosClient.put(`/theory-change-requests/${id}/approve`)
            .then(() => {
                alert("Request approved!");
                refreshRequests(); 
            })
            .catch((error) => {
                console.error("Error approving request:", error);
            });
    };

    const rejectRequest = (id) => {
        axiosClient.delete(`/theory-change-requests/${id}/reject`)
            .then(() => {
                alert("Request rejected!");
                refreshRequests();
            })
            .catch((error) => {
                console.error("Error rejecting request:", error);
            });
    };

    return (
        <div className="user-table">
            <div className="dashboard-header">
                <h2>Theory Change Requests</h2>
            </div>
            {requests.length === 0 ? (
                <p className="message">No requests available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Theory Title</th>
                            <th>Author</th>
                            <th>Rating</th>
                            <th>Suggested Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.theory?.title || "Unknown Title"}</td>
                                <td>{request.user?.username || "Unknown Author"}</td>
                                <td>{request.user?.rating}</td>
                                <td style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                                    {request.content || "No Content"}
                                </td>
                                <td>
                                    <button onClick={() => approveRequest(request.id)}>Approve</button>
                                    <button onClick={() => rejectRequest(request.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RequestsList;
