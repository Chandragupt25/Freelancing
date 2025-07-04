import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Access/Login.css';


export default function Login() {
  const [role, setRole] = useState('worker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
      role, 
    });

    alert(res.data.message);

    if (role === 'worker') navigate('/worker/dashboard');
    else navigate('/hire/dashboard');
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login as {role === 'worker' ? 'Worker' : 'Hire'}</h2>

        <div className="role-buttons">
          <button
            className={`role-btn ${role === 'worker' ? 'active' : ''}`}
            onClick={() => setRole('worker')}
          >
            Worker
          </button>
          <button
            className={`role-btn ${role === 'hire' ? 'active' : ''}`}
            onClick={() => setRole('hire')}
          >
            Hire
          </button>
        </div>

        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-btn">Login</button>

        <p className="login-register-text">
          New here? <span className="register-link" onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
}
