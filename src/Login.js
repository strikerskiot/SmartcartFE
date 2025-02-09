import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './api'; // Import the login function
import './Login.css';
import eyeIcon from './image/eye.png';
import eyeOffIcon from './image/eye-off.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    // Validate mobile number
    if (mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Call the login API
    try {
      const response = await login({ mobile, password });
      console.log('Login successful:', response);

      // Navigate to the select cart page
      navigate('/selectcart');
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="logo">Cart🛒System</h2>
        <h3 className="login-title">Log in</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mobile">Mobile Number</label>
          <input 
            type="tel" 
            id="mobile" 
            placeholder="Enter mobile number" 
            pattern="[0-9]{10}" 
            maxLength="10" 
            required 
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
          />
          
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Password" 
              minLength="8" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="toggle-password" onClick={togglePasswordVisibility}>
              <img 
                src={showPassword ? eyeIcon : eyeOffIcon} 
                alt={showPassword ? "Hide Password" : "Show Password"} 
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button">Log in</button>
        </form>
        <div className="footer">
          <p>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </p>
          <p>
            Don’t have an account? <Link to="/signup" className="sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
