import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientDashboard.css';

function PatientDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const userInfoResponse = await axios.get('http://localhost:8080/user/info', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setUser(userInfoResponse.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    setError('Error fetching user info. Please try again.');
                }
            }
        };

        fetchUserInfo();
    }, []);

    const goToLogin = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setUser(null);
        goToLogin();
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="navbar">
                <div className="nav-left">
                    <a href="/admin-dashboard">Patient Dashboard</a>
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <a href="/payments">Payments</a>
                </div>
                <div className="nav-right">
                    <span>{user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="dashboard-content">
                <h2>Welcome, {user.name} {user.surname}!</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="user-info">
                    <img src={user.photoUrl} alt={`${user.name} ${user.surname}`} className="profile-photo" />
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Birthday:</strong> {user.birthday}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Info:</strong> {user.info}</p>
                    {/* Add more user info fields as needed */}
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
