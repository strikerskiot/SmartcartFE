// import axios from 'axios';

// // Base URL for API requests
// const BASE_URL = 'http://192.168.214.225:3000/api/auth'; 
// // const BASE_URL = 'http://localhost:3000/api/auth'; // Use this if running locally

// // Helper function to handle errors
// const handleAxiosError = (error) => {
//   if (error.response) {
//     console.error('Response Error:', error.response.data);
//     return error.response.data?.message || 'Server returned an error';
//   } else if (error.request) {
//     console.error('Request Error: No response received', error.request);
//     return 'No response received from server. Please check your network.';
//   } else {
//     console.error('Unexpected Error:', error.message);
//     return 'Unexpected error occurred. Please try again.';
//   }
// };

// // Function to handle the signup request
// export const signUp = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/signup`, {
//       username: formData.username,
//       mobilenum: formData.mobile, // Backend expects this key
//       password: formData.password,
//       confirm_password: formData.confirmPassword, // Match backend naming
//     });
//     return response.data; // Return success response
//   } catch (error) {
//     throw new Error(handleAxiosError(error));
//   }
// };

// // Function to handle the login request
// export const login = async (credentials) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/login`, {
//       mobilenum: credentials.mobile, // Match backend key
//       password: credentials.password,
//     });
//     return response.data; // Return success response
//   } catch (error) {
//     throw new Error(handleAxiosError(error));
//   }
// };

// // Request OTP for password reset
// export const requestOtp = async (mobile) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/forgot-password`, {
//       mobilenum: mobile,
//     });
//     return response.data; // Return success response
//   } catch (error) {
//     throw new Error(handleAxiosError(error));
//   }
// };

// // Verify OTP
// export const verifyOtp = async (mobile, otp) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/verify-otp`, {
//       mobilenum: mobile,
//       otp, // Match backend key
//     });
//     return response.data; // Return success response
//   } catch (error) {
//     throw new Error(handleAxiosError(error));
//   }
// };

// // Reset password with OTP
// export const resetPassword = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/reset-password`, {
//       mobilenum: formData.mobile,
//       otp: formData.otp,
//       newPassword: formData.newPassword,
//       confirmPassword: formData.confirmPassword,
//     });
//     return response.data; // Return success response
//   } catch (error) {
//     throw new Error(handleAxiosError(error));
//   }
// };



import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'https://cartprojectbe.onrender.com/api/auth'; 

// Helper function to handle errors
const handleAxiosError = (error) => {
  if (error.response) {
    console.error('Response Error:', error.response.data);
    return error.response.data?.message || 'Server returned an error';
  } else if (error.request) {
    console.error('Request Error: No response received', error.request);
    return 'No response received from server. Please check your network.';
  } else {
    console.error('Unexpected Error:', error.message);
    return 'Unexpected error occurred. Please try again.';
  }
};

// Function to handle the signup request
export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      username: formData.username,
      mobilenum: formData.mobile, // Backend expects this key
      password: formData.password,
      confirm_password: formData.confirmPassword, // Match backend naming
    });
    return response.data; // Return success response
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Function to handle the login request
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      mobilenum: credentials.mobile, // Match backend key
      password: credentials.password,
    });
    return response.data; // Return success response
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Request OTP for password reset
export const requestOtp = async (mobile) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
      mobilenum: mobile,
    });
    return response.data; // Return success response
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Verify OTP
export const verifyOtp = async (mobile, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
      mobilenum: mobile,
      otp, // Match backend key
    });
    return response.data; // Return success response
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Reset password with OTP
export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, {
      mobilenum: formData.mobile,
      otp: formData.otp,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
    return response.data; // Return success response
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};
