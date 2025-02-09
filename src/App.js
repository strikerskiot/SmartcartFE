import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import SignUpPage from './signup';
import ForgotPassword from './fp';
import NewPassword from './nfp';
import SmartCart from './SmartCart';
import Selectcart from './selectcart';
import GoogleMapsNavigation from './GoogleMapsNavigation.js';
import Trackcart from './Trackcart.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SmartCart />} /> {/* Default homepage */}
        <Route path="/smart-cart" element={<SmartCart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/nfp" element={<NewPassword />} />
        <Route path="/selectcart" element={<Selectcart />} />
        <Route path="/GoogleMapsNavigation" element={<GoogleMapsNavigation />} />
        <Route path="/Trackcart" element={<Trackcart />} />
      </Routes>
    </div>
  );
}

export default App;
