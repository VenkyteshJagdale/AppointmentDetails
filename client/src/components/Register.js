import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { setToken } from '../auth';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(form);
      if (data.token) {
        setToken(data.token);
        navigate('/login');
      } else {
        throw new Error('No token returned');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Registration failed');
      console.error('Registration error:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Register</button>
        <button type="button" onClick={handleLoginRedirect}>Login</button>
      </form>

    </div>
  );
};

export default Register;
