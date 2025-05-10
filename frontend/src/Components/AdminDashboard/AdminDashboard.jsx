import './AdminDashboard.css';
import React, { useState, useEffect } from "react";
import Header from '../Header/Header.jsx';
import SidePanel from '../SidePanel/SidePanel.jsx';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client.js'; 
import UserTable from './UserTable.jsx';


function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/admin/users')
            .then(({ data }) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="admin-dashboard">
            <Header page={"ADMIN DASHBOARD"} />
            <div className='content'>
                <SidePanel />
                <div className='main-container'>
                    <div className='dashboard'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <UserTable users={users} setUsers={setUsers} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
