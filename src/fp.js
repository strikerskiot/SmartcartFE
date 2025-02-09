import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './fp.css';
import { requestOtp, verifyOtp } from './api';

const ForgotPassword = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for OTP characters
  const [mobile, setMobile] = useState(""); // Mobile number input
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP is sent
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1) { // Limit to one character per field
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      } else if (value === "" && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setMobile(value);
    }
  };

  const handleSendOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!mobile || mobile.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await requestOtp(mobile);
      setSuccessMessage(response.message || "OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (otp.some((digit) => digit === "")) {
      setErrorMessage("Please complete the OTP.");
      return;
    }

    try {
      const response = await verifyOtp(mobile, otp.join(""));
      setSuccessMessage(response.message || "OTP verified successfully!");

      // Navigate to New Password page with state
      navigate('/nfp', { state: { mobile, otp: otp.join("") } });
    } catch (error) {
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
    }
  };

  const isFormValid = mobile && otpSent && otp.every((digit) => digit !== "");

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="logo">Cart🛒System</h2>
        <h3 className="forgot-password-title">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            placeholder="Mobile number"
            value={mobile}
            onChange={handleMobileChange}
            maxLength="10"
            required
          />

          <button type="button" className="otp-button" onClick={handleSendOtp}>
            Send OTP
          </button>

          {otpSent && (
            <>
              <label>OTP</label>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-${index}`}
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="otp-input"
                    required
                  />
                ))}
              </div>
            </>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button
            type="submit"
            className={`submit-button ${isFormValid ? "" : "disabled-link"}`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
