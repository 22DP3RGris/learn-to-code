import React, { useEffect, useState } from 'react';
import './UserTable.css';
import axiosClient from '../../axios-client.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUsers, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading.jsx';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [roleStats, setRoleStats] = useState([]);
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeColumn, setActiveColumn] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
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
    const [usersLoading, setUsersLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    const fetchUsers = () => {
        axiosClient.get('/users/filter', {
            params: {
                search: filters.search,
                role: filters.role,
                created_on: filters.created_on,
                sortBy,
                sortOrder,
            }
        })
        .then(({ data }) => {
            setUsers(data.users);
            setAverageRating(data.average_rating);
            setUsersLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
            setUsersLoading(false);
        });
    };

    const fetchRoleStats = () => {
        axiosClient.get('/users-role-statistics')
            .then(({ data }) => {
                setRoleStats(data);
                setStatsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching role statistics:', error);
                setStatsLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [filters, sortBy, sortOrder]);

    useEffect(() => {
        fetchRoleStats();
    }, []);

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
                    fetchUsers();
                    fetchRoleStats();
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
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
            .then(() => {
                setEditingUser(null);
                setErrorMessages({});
                fetchUsers();
                fetchRoleStats();
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrorMessages(error.response.data.errors);
                }
            });
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('lv-LV');

    return usersLoading && statsLoading ? <Loading /> : (
        <>
            <div className="user-table">
                <div className="dashboard-header">
                    <h2><FontAwesomeIcon icon={faUsers} className="icon" /> Filtered user count: {users.length}</h2>
                    <h3>Average Rating: {averageRating}</h3>
                </div>

                <div className="role-statistics">
                    {roleStats.map(stat => (
                        <div key={stat.role} className="stat-box">
                            <div className="role">{stat.role.charAt(0).toUpperCase() + stat.role.slice(1)}</div>
                            <div className="count">{stat.total}</div>
                        </div>
                    ))}
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
                                <th
                                    key={field}
                                    onClick={() => toggleSortOrder(field)}
                                    className={activeColumn === field ? 'active' : ''}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                                    {activeColumn === field && (
                                        <FontAwesomeIcon
                                            icon={sortOrder === 'asc' ? faSortUp : faSortDown}
                                            style={{ marginLeft: '5px' }}
                                        />
                                    )}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
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
                            {['username', 'email', 'phone', 'role', 'rating'].map((field) => (
                                <label key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                    {field === 'role' ? (
                                        <select value={editedUserData[field]} onChange={(e) => setEditedUserData({ ...editedUserData, [field]: e.target.value })}>
                                            <option value="">-- Select Role --</option>
                                            <option value="admin">Admin</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={field === 'rating' ? 'number' : 'text'}
                                            value={editedUserData[field]}
                                            onChange={(e) => setEditedUserData({ ...editedUserData, [field]: e.target.value })}
                                        />
                                    )}
                                    {errorMessages[field] && <div className="error-message">{errorMessages[field]}</div>}
                                </label>
                            ))}
                            <button onClick={handleSaveEdit}>Save Changes</button>
                            <button onClick={() => setEditingUser(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserTable;
