import './AdminDashboard.css';
import React, { useState, useEffect } from "react";
import Header from '../Header/Header.jsx';
import SidePanel from '../SidePanel/SidePanel.jsx';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client.js'; 
import Loading from '../Loading/Loading.jsx';
import UserTable from './UserTable.jsx';
import RequestsList from './RequestList.jsx';

function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('users');

    const fetchUsers = () => {
        axiosClient.get('/admin/users')
            .then(({ data }) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setLoading(false);
            });
    };

    const fetchRequests = () => {
        axiosClient.get('/theory-change-requests')
            .then(({ data }) => {
                setRequests(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching requests:', err);
            });
    };


    useEffect(() => {
        fetchUsers();
        fetchRequests();
    }, []);

    return (
        <div className="admin-dashboard">
            <Header page={"ADMIN DASHBOARD"} />
            <div className='content'>
                <SidePanel />
                <div className='main-container'>
                    <div className='dashboard'>

                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <div className='view-selector'>
                                    <label>View: </label>
                                    <select value={view} onChange={(e) => setView(e.target.value)}>
                                        <option value="users">Users</option>
                                        <option value="requests">Theory Change Requests</option>
                                    </select>
                                </div>

                                {view === 'users' && (
                                    <UserTable users={users} setUsers={setUsers} />
                                )}
                                {view === 'requests' && (
                                    <div className='request-list'>
                                        <RequestsList 
                                            requests={requests}
                                            setRequests={setRequests}
                                            refreshRequests={fetchRequests}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;