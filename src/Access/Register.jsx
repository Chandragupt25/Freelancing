import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Access/Register.css';
import axios from 'axios';

export default function Register() {
  const [role, setRole] = useState('worker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    profession: '',
    password: '',
    confirmPassword: ''
  });

  const professions = ['Painter', 'Carpenter', 'Home Cleaner', 'Other'];
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async () => {
    const {
      name, email, phone, city, state, pincode,
      profession, password, confirmPassword
    } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert('Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (role === 'worker' && (!city || !state || !pincode || !profession)) {
      alert('Please complete all worker fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        role,
      });

      alert(res.data.message);

      if (role === 'worker') navigate('/worker/dashboard');
      else navigate('/hire/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          Register as {role === 'worker' ? 'Worker' : 'Hire'}
        </h2>

        <div className="register-role-buttons">
          <button
            className={`register-role-btn ${role === 'worker' ? 'active' : ''}`}
            onClick={() => setRole('worker')}
          >
            Worker
          </button>
          <button
            className={`register-role-btn ${role === 'hire' ? 'active' : ''}`}
            onClick={() => setRole('hire')}
          >
            Hire
          </button>
        </div>

        <input name="name" type="text" placeholder="Name" className="register-input" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="register-input" onChange={handleChange} />
        <input name="phone" type="tel" placeholder="Phone Number" className="register-input" onChange={handleChange} />

        {role === 'worker' && (
          <div className="register-worker-grid">
            <input name="city" type="text" placeholder="City" className="register-input" onChange={handleChange} />
            <input name="state" type="text" placeholder="State" className="register-input" onChange={handleChange} />
            <input name="pincode" type="text" placeholder="Pincode" className="register-input" onChange={handleChange} />

            <div className="custom-dropdown-wrapper">
              <input
                name="profession"
                type="text"
                placeholder="Profession"
                className="register-input"
                value={formData.profession}
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                autoComplete="off"
              />
              {showDropdown && (
                <ul className="dropdown-options">
                  {professions.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setFormData((prev) => ({ ...prev, profession: item }));
                        setShowDropdown(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <input name="password" type="password" placeholder="Password" className="register-input" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="register-input" onChange={handleChange} />

        <button onClick={handleRegister} className="register-btn">Register</button>

        <p className="register-login-text">
          Already registered? <span className="login-link" onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}
