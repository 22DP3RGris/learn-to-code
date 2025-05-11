import React, { useState } from 'react';
import './UserTable.css';
import axiosClient from "../../axios-client.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

function UserTable({ users, setUsers }) {
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeColumn, setActiveColumn] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        created_on: ''
    });

    const [editedUserData, setEditedUserData] = useState({
        username: '',
        email: '',
        phone: '',
        role: '',
        rating: ''
    });

    const [errorMessages, setErrorMessages] = useState({});  

    const toggleSortOrder = (field) => {
        const newOrder = (sortBy === field && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(newOrder);
        setActiveColumn(field);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axiosClient.delete(`/users/${userId}`)
                .then(() => {
                    setUsers(prev => prev.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error('Failed to delete user:', error);
                });
        }
    };

    const handleEditUser = (userId) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setEditingUser(userId);
            setEditedUserData({
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                rating: user.rating
            });
        }
    };

    const handleSaveEdit = () => {
        axiosClient.put(`/users/${editingUser}`, editedUserData)
            .then(({ data }) => {
                setUsers(prev => prev.map(user =>
                    user.id === editingUser ? data : user
                ));
                setEditingUser(null);
                setErrorMessages({}); 
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
            
                    setErrorMessages(error.response.data.errors);  
                } else {
                    console.error('Failed to update user:', error);
                }
            });
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleString('lv-LV', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

    const filteredUsers = users
        .filter(u =>
            u.username.toLowerCase().includes(filters.search.toLowerCase()) ||
            u.email.toLowerCase().includes(filters.search.toLowerCase())
        )
        .filter(u => (filters.role ? u.role === filters.role : true))
        .filter(u => (filters.created_on ? u.created_at >= filters.created_on : true))
        .sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    return (
        <div className="user-table">
            <div className="dashboard-header">
                <h2><FontAwesomeIcon icon={faUsers} className="icon" /> Filtered user count: {filteredUsers.length}</h2>
            </div>

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
                <input
                    type="date"
                    value={filters.created_on}
                    onChange={(e) => setFilters({ ...filters, created_on: e.target.value })}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        {['username', 'email', 'phone', 'role', 'rating', 'created_at'].map(field => (
                            <th key={field}
                                onClick={() => toggleSortOrder(field)}
                                className={activeColumn === field ? 'active' : ''}>
                                {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.rating}</td>
                            <td>{formatDate(user.created_at)}</td>
                            <td>
                                <button onClick={() => handleEditUser(user.id)}><FontAwesomeIcon icon={faEdit} /></button>
                                <button onClick={() => handleDeleteUser(user.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div className="edit-modal">
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <label>Username:
                            <input type="text" value={editedUserData.username}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })} />
                            {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
                        </label>
                        <label>Email:
                            <input type="email" value={editedUserData.email}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} />
                            {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
                        </label>
                        <label>Phone:
                            <input type="text" value={editedUserData.phone}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })} />
                            {errorMessages.phone && <div className="error-message">{errorMessages.phone}</div>}
                        </label>
                        <label>Role:
                            <select value={editedUserData.role}
                                    onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}>
                                <option value="">-- Select Role --</option>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            {errorMessages.role && <div className="error-message">{errorMessages.role}</div>}
                        </label>
                        <label>Rating:
                            <input type="number" value={editedUserData.rating}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, rating: e.target.value })} />
                            {errorMessages.rating && <div className="error-message">{errorMessages.rating}</div>}
                        </label>
                        <button onClick={handleSaveEdit}>Save Changes</button>
                        <button onClick={() => setEditingUser(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserTable;
