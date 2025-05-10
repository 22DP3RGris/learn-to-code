import React, { useEffect, useState } from 'react';
import axiosClient from "../../axios-client.js";
import './UserTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeColumn, setActiveColumn] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        created_after: ''
    });

    const [editedUserData, setEditedUserData] = useState({
        username: '',
        email: '',
        phone: '',
        role: ''
    });

    const getTotalUsers = () => users.length;

    const fetchUsers = async () => {
        try {
            const params = new URLSearchParams({
                sortBy,
                sortOrder,
                ...filters
            });
            const response = await axiosClient.get(`/users-filter?${params}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [sortBy, sortOrder, filters]);

    const toggleSortOrder = (field) => {
        const newOrder = (sortBy === field && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(newOrder);
        setActiveColumn(field);
    };

    const handleDeleteUser = (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            axiosClient.delete(`/users/${userId}`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch((error) => {
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
                role: user.role
            });
        }
    };

    const handleSaveEdit = () => {
        axiosClient.put(`/users/${editingUser}`, editedUserData)
            .then((response) => {
                const updatedUser = response.data;
                setUsers(users.map(user =>
                    user.id === editingUser ? updatedUser : user
                ));
                setEditingUser(null);
            })
            .catch((error) => {
                console.error('Failed to update user:', error);
            });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('lv-LV', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div className="user-table">
            <div className="dashboard-header">
                <h2><FontAwesomeIcon icon={faUsers} className="icon" /> Filtered user count: {getTotalUsers()}</h2>
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
                    onChange={(e) =>
                        setFilters({ ...filters, created_on: e.target.value })
                    }
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => toggleSortOrder('username')} className={activeColumn === 'username' ? 'active' : ''}>Username</th>
                        <th onClick={() => toggleSortOrder('email')} className={activeColumn === 'email' ? 'active' : ''}>Email</th>
                        <th onClick={() => toggleSortOrder('phone')} className={activeColumn === 'phone' ? 'active' : ''}>Phone</th>
                        <th onClick={() => toggleSortOrder('role')} className={activeColumn === 'role' ? 'active' : ''}>Role</th>
                        <th onClick={() => toggleSortOrder('created_at')} className={activeColumn === 'created_at' ? 'active' : ''}>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
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
                        </label>
                        <label>Email:
                            <input type="email" value={editedUserData.email}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} />
                        </label>
                        <label>Phone:
                            <input type="text" value={editedUserData.phone}
                                   onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })} />
                        </label>
                        <label>Role:
                            <select value={editedUserData.role}
                                    onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}>
                                <option value="">-- Select Role --</option>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
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
