import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UsersList.css';
import UserService from '../services/UserService';

const UsersList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await UserService.getUsersForAdmin(token);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openStatusChangePopup = (user) => {
        setSelectedUser(user);
        setStatus(user.status);
    };

    const openPhotoPopup = (photoUrl) => {
        setSelectedPhoto(photoUrl);
    };

    const goToLogin = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        goToLogin();
    };

    const handleStatusChange = async () => {
        const token = localStorage.getItem('token');
        try {
            await UserService.updateStatus(token, selectedUser.id, status);

            fetchUsers();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="users-list-container">
            <div className="navbar">
                <div className="nav-left">
                    <a href="/admin-dashboard">Admin Dashboard</a>
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <a href="/all-reservations">Reservations</a>
                    <a href="/doctors">Doctors</a>
                    <a href="/users-list" className="active">All Users</a>
                </div>
                <div className="nav-right">
                    <span>{localStorage.getItem('username')}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Info</th>
                            <th>Photo</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="role">{user.role}</td>
                                <td>{user.gender === 1 ? 'Female' : 'Male'}</td>
                                <td>{user.address}</td>
                                <td>{user.info}</td>
                                <td>
                                    <button onClick={() => openPhotoPopup(user.photoUrl)}>View Photo</button>
                                </td>
                                <td>{user.status}</td>
                                <td>
                                    <button onClick={() => openStatusChangePopup(user)}>Change Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div className="status-change-popup">
                    <div className="status-change-content">
                        <h2>Change Status</h2>
                        <p>User: {selectedUser.username}</p>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="DELETED">DELETED</option>
                        </select>
                        <div className="button-container">
                            <button onClick={handleStatusChange}>Save</button>
                            <button onClick={() => setSelectedUser(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedPhoto && (
                <div className="photo-popup" onClick={() => setSelectedPhoto(null)}>
                    <div className="photo-popup-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedPhoto} alt="User Photo" />
                        <button className="close-popup" onClick={() => setSelectedPhoto(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;
