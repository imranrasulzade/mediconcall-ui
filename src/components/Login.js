import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import AccountService from '../services/AccountService';


function Login() {
  const navigate = useNavigate();
  const [loginReq, setLoginReq] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginReq({ ...loginReq, [name]: value });
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToAdminDashboard = () => {
    navigate('/admin-dashboard');
  };

  const goToPatientDashboard = () => {
    navigate('/patient-dashboard');
  };

  const goToDoctorDashboard = () => {
    navigate('/doctor-dashboard');
  };

  // const handleForgotPassword = () => {
  //   navigate('/forgot-password');
  // };
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AccountService.signIn(loginReq);
      const { token } = response.data;
      const { username } = response.data;
      localStorage.setItem('token', token); 
      localStorage.setItem('username', username);
      // console.log(localStorage.getItem('token'));

      // navigate("/admin-dashboard");
      if(response.data.roles[0] == 'ROLE_PATIENT'){
        goToPatientDashboard();
      }else if(response.data.roles[0] == 'ROLE_DOCTOR'){
        goToDoctorDashboard();
      }else if(response.data.roles[0] == 'ROLE_ADMIN')
        goToAdminDashboard();
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={loginReq.username} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={loginReq.password} onChange={handleInputChange} required />
        </div>
        <button type="submit">Login</button>

      </form>
      <br></br>
      <button className='register-button' onClick={goToRegister}>Register - New Account</button>
      <br></br>
      <br></br>
      <a href="forgot-password">Forgot password</a>



    </div>
  );
}

export default Login;
