import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Header from '../Header/Header.jsx';
import SidePanel from "../SidePanel/SidePanel.jsx";
import axiosClient from "../../axios-client.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faUserGraduate, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import Loading from "../Loading/Loading.jsx";

function Profile() {
    const { user, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        password_confirmation: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
                setFormData({
                    username: data.username || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    role: data.role || "",
                    password: "",
                    password_confirmation: ""
                });
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        setSaving(true);
        setMessage("");
        setMessageType(""); 
    
        axiosClient.put('/user/update', formData)
            .then(({ data }) => {
                setUser(data.user);
                setMessage("Profile updated successfully.");
                setMessageType("success"); 
                setSaving(false);
            })
            .catch(err => {
                
                console.error("Error details:", err.response);
    
              
                if (err.response && err.response.data && err.response.data.errors) {
              
                    setMessage(Object.values(err.response.data.errors).join(" & "));
                    setMessageType("error");
                } else {
                
                    setMessage("Failed to update profile. Please try again later.");
                    setMessageType("error");
                }
    
                setSaving(false);
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
                navigate('/login');
            });
    };
    return (
        <div className="profile">
            <Header page="PROFILE" />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    {loading ? (
                        <div className="loading-screen">
                            <Loading/>
                        </div>
                    ) : (
                    <div className="profile-container">
                        <h2>PROFILE</h2>
                        <div className="profile-info">
                            <div className="profile-field">
                                <label htmlFor="username"><FontAwesomeIcon icon={faUser} className="label-icon" /> Username:</label>
                                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                            </div>
                            <div className="profile-field">
                                <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className="label-icon" /> Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="profile-field">
                                <label htmlFor="phone"><FontAwesomeIcon icon={faPhone} className="label-icon" /> Phone:</label>
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="profile-field">
                                <label htmlFor="password"><FontAwesomeIcon icon={faLock} className="label-icon" />New Password:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="profile-field">
                                <label htmlFor="password_confirmation"><FontAwesomeIcon icon={faCheck} className="label-icon" />Confirm New Password:</label>
                                <input 
                                    type="password" 
                                    id="password_confirmation" 
                                    name="password_confirmation" 
                                    value={formData.password_confirmation} 
                                    onChange={handleChange} 
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="profile-field">
                                <label htmlFor="role"><FontAwesomeIcon icon={faUserGraduate} className="label-icon" /> Role:</label>
                                <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    {user.role === 'admin' && <option value="admin">Admin</option>}
                                </select>
                            </div>
                        </div>

                        {message && (
                            <div className={`update-message ${messageType === 'success' ? 'update-message-success' : 'update-message-error'}`}>
                                {message}
                            </div>
                        )}

                        <div className="profile-actions">
                            <button onClick={handleUpdate} className="update-btn" disabled={saving}>
                                {saving ? "Saving..." : "Update Profile"}
                            </button>
                            <button onClick={handleLogout} className="logout">LOGOUT</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
