import React, { useState } from 'react';
// import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPatient.css';
import PatientService from "../services/PatientService";

function RegisterPatient() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [info, setInfo] = useState('');
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const [bankAccount, setBankAccount] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('info', info);
    formData.append('photo', photo);
    formData.append('document', document);
    formData.append('bankAccount', bankAccount);

    try {
      const response = PatientService.savePatient(formData);
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      setTimeout(goToLogin, 500); // Navigate to login page after 0.5 seconds
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const goToLogin = () => {
    navigate('/'); 
  };

  return (
    <div className="register-patient-container">
      <h2>Register as Patient</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Birthday:</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Additional Info:</label>
          <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
        </div>
        <div>
          <label>Document:</label>
          <input type="file" onChange={(e) => setDocument(e.target.files[0])} required />
        </div>
        <div>
          <label>Bank Account:</label>
          <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPatient;
