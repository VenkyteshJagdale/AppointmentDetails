import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { setToken } from '../auth';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      setToken(data.token);

      // Redirect based on role
      if (data.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (data.role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed');
      console.error('Login error:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterRedirect}>Register</button>
      </form>

    </div>
  );
};

export default Login;
