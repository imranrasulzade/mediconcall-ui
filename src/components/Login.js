import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const [loginReq, setLoginReq] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginReq({ ...loginReq, [name]: value });
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/account/sign-in', loginReq);

      // Handle successful login
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage

      console.log(localStorage.getItem('token'));

      // Make request to get user info
      // const userInfoResponse = await axios.get('http://localhost:8080/user/info', {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      // console.log('User info:', userInfoResponse.data);
      // Redirect or navigate to another page with user info
      // Example: navigate('/dashboard'); // Use navigate from react-router or your routing library
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
    </div>
  );
}

export default Login;
