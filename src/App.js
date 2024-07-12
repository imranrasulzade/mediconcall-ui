import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import RegisterPatient from './components/RegisterPatient';
import RegisterDoctor from './components/RegisterDoctor';
import './App.css';  // Add this line to import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <nav className='nav'>
        <Link to="/" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/register-doctor" element={<RegisterDoctor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
