import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountService from '../services/AccountService';
import '../styles/RecoveryPassword.css';

function RecoveryPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [passwordResetTokenModel, setPasswordResetTokenModel] = useState({
    token: '',
    newPassword: '',
    retryPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordResetTokenModel({ ...passwordResetTokenModel, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AccountService.recoveryPassword(passwordResetTokenModel);
      setSuccess(true);
      // Redirect to login page after successful password reset
      navigate('/');
    } catch (error) {
      console.error('Password reset failed:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="recovery-password-container">
      <h2>Recovery Password</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Password reset successfully. You can now login with your new password.</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token:</label>
          <input type="text" name="token" value={passwordResetTokenModel.token} onChange={handleInputChange} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="newPassword" value={passwordResetTokenModel.newPassword} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Retry Password:</label>
          <input type="password" name="retryPassword" value={passwordResetTokenModel.retryPassword} onChange={handleInputChange} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <button className="back-to-forgot-password-button" onClick={handleBackToForgotPassword}>Back</button>
    </div>
  );
}

export default RecoveryPassword;
