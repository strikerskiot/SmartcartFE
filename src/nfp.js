import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './nfp.css';
import eyeIcon from './image/eye-off.png'; // Path to your eye icon image
import eyeSlashIcon from './image/eye.png'; // Path to your eye slash icon image
import { resetPassword } from './api'; // Import the API function

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract mobile and OTP from location state
  const { mobile, otp } = location.state || {}; 

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!mobile || !otp) {
      // Redirect to forgot password if mobile or OTP is missing
      navigate('/forgot-password');
    }
  }, [mobile, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword && newPassword !== "" && confirmPassword !== "") {
      try {
        const response = await resetPassword({
          mobile, // Mobile number used for verification
          otp, // OTP previously received
          newPassword,
          confirmPassword,
        });
        setSuccessMessage(response.message || "Password reset successfully! Redirecting to login...");
        setError("");

        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setError(error.message);
        setSuccessMessage("");
      }
    } else {
      setError("Passwords do not match or are empty.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="new-password-container">
      <div className="new-password-box">
        <h2 className="project-title">Cart🛒System</h2> {/* Project Title */}
        <h3 className="new-password-title">Set New Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">New Password</label>
          <div className="input-group">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="8"
            />
            <img
              src={showNewPassword ? eyeSlashIcon : eyeIcon}
              alt="Toggle Password Visibility"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="toggle-password-visibility"
            />
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="8"
            />
            <img
              src={showConfirmPassword ? eyeSlashIcon : eyeIcon}
              alt="Toggle Password Visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password-visibility"
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
