import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Access/Login.css';

export default function Login() {
  const [role, setRole] = useState('worker');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'worker') navigate('/worker/dashboard');
    else navigate('/hire/dashboard');
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

        <input type="text" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button onClick={handleLogin} className="login-btn">Login</button>

        {/* 👇 Register Link */}
        <p className="login-register-text">
          New here? <span className="register-link" onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
}