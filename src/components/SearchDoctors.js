import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchDoctor.css';

function SearchDoctor() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [totalElements, setTotalElements] = useState(0);
    const [specialty, setSpecialty] = useState('');
    const [name, setName] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSpecialties = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/doctor/specialties', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSpecialties(response.data || []);
            } catch (error) {
                console.error('Error fetching specialties:', error);
                setError('Error fetching specialties. Please try again.');
            }
        };

        fetchSpecialties();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/doctor/patient/search-doctor', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            page: page,
                            size
                        }
                    });
                    
                    if (response.data && response.data.data) {
                        setDoctors(response.data.data);
                        setTotalElements(response.data.totalElements || 0);
                    } else {
                        setDoctors([]);
                        setTotalElements(0);
                    }
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                    setError('Error fetching doctors. Please try again.');
                }
            }
        };

        fetchDoctors();
    }, [page, size]);

    const handleSearch = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const params = {
                    page: page,
                    size,
                };

                if (name) params.name = name;
                if (specialty) params.specialty = specialty;

                const response = await axios.get('http://localhost:8080/doctor/patient/search-doctor', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params
                });

                if (response.data && response.data.data) {
                    setDoctors(response.data.data);
                    setTotalElements(response.data.totalElements || 0);
                } else {
                    setDoctors([]);
                    setTotalElements(0);
                }
            } catch (error) {
                console.error('Error searching doctors:', error);
                setError('Error searching doctors. Please try again.');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="navbar">
                <div className="nav-left">
                    <a href="/patient-dashboard">Patient Dashboard</a>
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <a href="/payments">Payments</a>
                    <a href="/search-doctors" className="active">Doctors</a>
                </div>
                <div className="nav-right">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="search-container">
                <label htmlFor="specialty">Specialty:</label>
                <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                    <option value="">Non selected</option>
                    {specialties.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                    ))}
                </select>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="doctors-list">
                {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                        <div key={index} className="doctor-card">
                            <img src={doctor.photoUrl || process.env.PUBLIC_URL + '/default-doctor.png'} alt={`${doctor.name} ${doctor.surname}`} className="doctor-photo" />
                            <div className="doctor-info">
                                <p><strong>{doctor.academicTitle} {doctor.name} {doctor.surname}</strong></p>
                                <p>{doctor.specialty}</p>
                                <p>About: {doctor.info}</p>
                                <a href="#">read more...</a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No doctors found.</p>
                )}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&lt;</button>
                {Array.from({ length: Math.ceil(totalElements / size) }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</button>
                ))}
                <button onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(totalElements / size)}>&gt;</button>
            </div>
        </div>
    );
}

export default SearchDoctor;
