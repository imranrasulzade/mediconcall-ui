import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UsersList.css';
import UserService from '../services/UserService';
import DoctorService from '../services/DoctorService';

const DoctorsList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await DoctorService.getDoctorsForAdmin(token);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const openStatusChangePopup = (doctor) => {
        setSelectedDoctor(doctor);
        setStatus(doctor.status === 1 ? 'ACTIVE' : doctor.status === 0 ? 'INACTIVE' : 'DELETED');
    };

    const handleStatusChange = async () => {
        const token = localStorage.getItem('token');
        // const newStatus = status === 'ACTIVE' ? 1 : status === 'INACTIVE' ? 0 : -1;
        try {
            await UserService.updateStatus(token, selectedDoctor.userId, status);

            fetchDoctors();
            setSelectedDoctor(null);
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
                    <a href="/doctors" className="active">Doctors</a>
                    <a href="/users-list">All Users</a>
                </div>
                <div className="nav-right">
                    <span>{localStorage.getItem('username')}</span>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}>Logout</button>
                </div>
            </div>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Number</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Academic Title</th>
                            <th>Specialty</th>
                            <th>Place of Work</th>
                            <th>Phone</th>
                            <th>Qualification</th>
                            <th>Avg Rating</th>
                            <th>Info</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map(doctor => (
                            <tr key={doctor.doctorId}>
                                <td>{doctor.doctorId}</td>
                                <td className="usernum">{doctor.userId}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.surname}</td>
                                <td>{doctor.academicTitle}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.placeOfWork}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.qualification}</td>
                                <td className="rating">{doctor.avgRating}</td>
                                <td>{doctor.info}</td>
                                <td>{doctor.status === 1 ? 'ACTIVE' : doctor.status === 0 ? 'INACTIVE' : 'DELETED'}</td>
                                <td>
                                    <button onClick={() => openStatusChangePopup(doctor)}>Change Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedDoctor && (
                <div className="status-change-popup">
                    <div className="status-change-content">
                        <h2>Change Status</h2>
                        <p>Doctor: {selectedDoctor.name} {selectedDoctor.surname}</p>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="DELETED">DELETED</option>
                        </select>
                        <div className="button-container">
                            <button onClick={handleStatusChange}>Save</button>
                            <button onClick={() => setSelectedDoctor(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsList;
