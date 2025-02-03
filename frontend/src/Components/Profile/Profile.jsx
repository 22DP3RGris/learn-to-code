import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Header from '../Header/Header.jsx';
import axiosClient from "../../axios-client.js";
import './Profile.css';

function Profile() {
    const {user, setUser, setToken} = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data)
          })
    }, [])

    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
            navigate('/login')
          })
      }

    return (
        <div className="profile">
            <Header page="PROFILE"/>
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
    );
}

export default Profile;