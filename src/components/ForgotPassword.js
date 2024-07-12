import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountService from '../services/AccountService';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AccountService.forgotPassword(email);
      setSuccess(true);
      // Redirect to recovery-password page if successful
      navigate('/recovery-password');
    } catch (error) {
      console.error('Forgot password request failed:', error);
      setError('Failed to request password reset. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Password reset request sent. Check your email.</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleInputChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button className="back-to-login-button" onClick={handleBackToLogin}>Back to Login Page</button>

    </div>
  );
}

export default ForgotPassword;
