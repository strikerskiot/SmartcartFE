import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { signUp } from './api'; // Import the API function
import './signup.css';
import eyeImage from './image/eye.png'; // Update the path as necessary
import eyeOffImage from './image/eye-off.png'; // Update the path as necessary

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Define navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message initially
    setErrorMessage('');

    // Validate mobile number length
    if (formData.mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Call the signUp API
      const response = await signUp(formData);
      console.log('Signup successful:', response);

      // Navigate to the select cart page
      navigate('/selectcart');
    } catch (error) {
      console.error('Signup failed:', error.message);
      setErrorMessage(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="logo">Cart🛒System</h2>
        <h3 className="signup-title">Sign up</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User name"
            required
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter mobile number"
            maxLength="10"
            required
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value.replace(/[^0-9]/g, '') })
            }
          />

          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              minLength="8"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <img
              src={showPassword ? eyeImage : eyeOffImage}
              alt="Toggle Password Visibility"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            />
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              minLength="8"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <img
              src={showConfirmPassword ? eyeImage : eyeOffImage}
              alt="Toggle Confirm Password Visibility"
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>

        <div className="footer">
          <p>
            Already have an account? <Link to="/login" className="login-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
