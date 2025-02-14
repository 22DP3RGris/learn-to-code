import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Header from '../Header/Header.jsx';
import SidePanel from "../SidePanel/SidePanel.jsx";
import axiosClient from "../../axios-client.js";
import './Profile.css';

function Profile() {
    const { user, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }, []);

    const onLogout = ev => {
        ev.preventDefault();
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({});
            setToken(null);
            navigate('/login');
          });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <Header page="PROFILE" />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    <div className="profile-container">
                        <h2>PROFILE</h2>
                        <div className="profile-info">
                            <div className="profile-field">
                                <strong>Username:</strong>
                                <p>{user.username}</p>
                            </div>
                            <div className="profile-field">
                                <strong>Email:</strong>
                                <p>{user.email}</p>
                            </div>
                            <div className="profile-field">
                                <strong>Phone:</strong>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                        <button onClick={onLogout} className="logout">LOGOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;