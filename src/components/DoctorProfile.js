import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorService from '../services/DoctorService';
import '../styles/DoctorProfile.css';
import axios from 'axios';

function DoctorProfile() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState('');
    const [connectionStatus, setConnectionStatus] = useState(-1);

    useEffect(() => {
        const fetchDoctor = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await DoctorService.getDoctorById(token, doctorId);
                setDoctor(response.data || null);
            } catch (error) {
                console.error('Error fetching doctor:', error);
                setError('Error fetching doctor details. Please try again.');
            }
        };

        const fetchConnectionStatus = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8080/contact/patient/check?doctorId=${doctorId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setConnectionStatus(response.data);
            } catch (error) {
                console.error('Error fetching connection status:', error);
            }
        };

        fetchDoctor();
        fetchConnectionStatus();
    }, [doctorId]);

    const handleRequestConnection = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`http://localhost:8080/contact/patient/request?doctorId=${doctorId}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setConnectionStatus(0); // Set status to pending
        } catch (error) {
            console.error('Error requesting connection:', error);
        }
    };

    const handleDeleteConnection = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/contact/patient?doctorId=${doctorId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setConnectionStatus(-1); // Set status to not connected
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error deleting connection:', error);
        }
    };

    if (!doctor) {
        return <p>Loading...</p>;
    }

    const ratingPercentage = (doctor.avgRating / 5) * 100;

    return (
        <div className="dashboard-container">
            <div className="navbar">
                <div className="nav-left">
                    <a href="/patient-dashboard">Patient Dashboard</a>
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <a href="/payments">Payments</a>
                    <a href="/contacts">Contacts</a>
                    <a href="/search-doctors">Doctors</a>
                </div>
                <div className="nav-right">
                    <span>{localStorage.getItem("username")}</span>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}>Logout</button>
                </div>
            </div>
            <div className="doctor-profile-container">
                <div className="doctor-details">
                    <h2>{doctor.academicTitle} {doctor.name} {doctor.surname}</h2>
                    
                    <p>Specialty: {doctor.specialty}</p>
                    <p>Qualification: {doctor.qualification}</p>
                    <p>About: {doctor.info}</p>
                    {doctor.phone && <p>Phone: {doctor.phone}</p>}
                    {doctor.email && <p>Email: {doctor.email}</p>}
                    {doctor.placeOfWork && <p>Place of Work: {doctor.placeOfWork}</p>}
                    {doctor.birthday && <p>Birthday: {doctor.birthday}</p>}
                    {doctor.address && <p>Address: {doctor.address}</p>}
                    <p>Rating:</p>
                    <div className="rating-container">
                        <div className="rating">
                            <div className="rating-fill" style={{ width: `${ratingPercentage}%` }}></div>
                        </div>
                        <span>{doctor.avgRating.toFixed(1)}</span>
                        <a href="#">show more for rating...</a>
                    </div>
                    <br/>
                    {connectionStatus === 1 && (
                        <button onClick={handleDeleteConnection}>Delete Connection</button>
                    )}
                    {connectionStatus === 0 && (
                        <button onClick={handleDeleteConnection}>Pending... (Click to Cancel)</button>
                    )}
                    {connectionStatus === -1 && (
                        <button onClick={handleRequestConnection}>Request Connection</button>
                    )}
                    {doctor.phone && <button onClick={() => navigate(`/reservations/${doctorId}`)}>Reservations</button>}
                    <br/>
                    <br/>
                    
                    <button className="back-button" onClick={() => navigate(-1)}>Back to doctors list</button>
                </div>
                <img src={doctor.photoUrl || process.env.PUBLIC_URL + '/default-doctor.png'} alt={`${doctor.name} ${doctor.surname}`} className="doctor-photo" />
            </div>
        </div>
    );
}

export default DoctorProfile;
