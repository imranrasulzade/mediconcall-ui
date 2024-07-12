import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();

  const goToPatientRegister = () => {
    navigate('/register-patient');
  };

  const goToLogin = () => {
    navigate('/');
  };

  const goToDoctorRegister = () => {
    navigate('/register-doctor');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <button onClick={goToPatientRegister}>Register as Patient</button>
      <button onClick={goToDoctorRegister}>Register as Doctor</button>
      <br></br>
      <button className='login-button' onClick={goToLogin}>Back to Login page</button>

    </div>
  );
}

export default Register;
