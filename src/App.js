import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import RegisterPatient from './components/RegisterPatient';
import RegisterDoctor from './components/RegisterDoctor';
import './App.css';  // Add this line to import the CSS file
import AdminDashboard from './components/AdminDashboard';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import ForgotPassword from './components/ForgotPassword';
import RecoveryPassword from './components/RecoveryPassword';
import UsersList from './components/UsersList';
import DoctorList from './components/DoctorList';
import SearchDoctor from './components/SearchDoctors';
import DoctorProfile from './components/DoctorProfile';
// import Profile from './components/Profile';
// import Settings from './components/Settings';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav className='nav'>
        <Link to="/" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/register-doctor" element={<RegisterDoctor />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/search-doctors" element={< SearchDoctor/>} />
          <Route path="/doctor-profile/:doctorId" element={< DoctorProfile/>} />




          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
