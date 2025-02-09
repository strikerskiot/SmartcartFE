import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Trackcart_module.css';
import cartImage from './cart_1.img-removebg-preview.png';
import lorryImage from './cart_1.img-removebg-preview.png';

const TrackCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the start and destination from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const start = queryParams.get('start'); // Start location
  const destination = queryParams.get('destination'); // Destination from SelectCart

  const [distance, setDistance] = useState(2); // Initial distance set to 2 km
  const [time, setTime] = useState(20); // Initial time set to 20 seconds
  const [cartPosition, setCartPosition] = useState(0); // Cart position (0%)
  const [isTracking, setIsTracking] = useState(false);
  const [isArrived, setIsArrived] = useState(false);

  useEffect(() => {
    // Redirect to select cart page if no start or destination
    if (!start || !destination) {
      console.warn('Missing start or destination locations, redirecting...');
      navigate('/selectcart');
    }
  }, [start, destination, navigate]);

  useEffect(() => {
    let interval = null;

    if (isTracking && distance > 0 && time > 0) {
      const totalDistance = 100; // 100% screen width
      const distancePerSecond = 2 / 20; // Reduce 2 km in 20 seconds

      interval = setInterval(() => {
        setCartPosition((prev) => Math.min(prev + (100 / 20), 100)); // Move cart across the screen in 20 seconds
        setDistance((prev) => Math.max(prev - distancePerSecond, 0)); // Reduce distance proportionally
        setTime((prev) => Math.max(prev - 1, 0)); // Decrease time by 1 second
      }, 1000);
    } else if (distance <= 0 || time <= 0) {
      setCartPosition(100); // Cart reaches the end
      setIsArrived(true);
      clearInterval(interval); // Stop interval
    }

    return () => clearInterval(interval);
  }, [isTracking, distance, time]);

  const closePopup = () => {
    setIsArrived(false);
    setIsTracking(false); // Stop the tracking process
  };

  return (
    <div className="track-cart-container">
      <div className="road-background" style={{ position: 'relative', width: '100%', height: '150px' }}>
        {/* Ensure the container is 100% width to support full movement */}
        <img
          src={cartImage}
          alt="Cart"
          className="cart-image"
          style={{
            position: 'absolute', // Absolute positioning for full control
            left: `${cartPosition}%`, // Move cart based on position (0% to 100%)
            bottom: 0, // Cart stays at the bottom of the screen
            transition: 'left 1s linear', // Smooth transition
          }}
        />
      </div>
      <div className="cart-info">
        <h2>Cart Is Heading To Destination</h2>
        {!isTracking ? (
          <button
            onClick={() => {
              if (!isArrived) {
                setIsTracking(true); // Start tracking if not arrived
              }
            }}
          >
            Start Tracking
          </button>
        ) : (
          <div>
            <p>
              <strong>Estimated Distance:</strong> {distance.toFixed(2)} km
            </p>
            <p>
              <strong>Estimated Time:</strong> {Math.floor(time / 60)}m {time % 60}s
            </p>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/${encodeURIComponent(
                    start
                  )}/${encodeURIComponent(destination)}`,
                  '_blank'
                )
              }
            >
              Track on Map
            </button>
          </div>
        )}
      </div>

      {isArrived && (
        <div className="popup">
          <div className="popup-content">
            <h3>
              <img src={lorryImage} alt="Lorry" style={{ width: '40px' }} />{' '}
              Your Cart Has Arrived!
            </h3>
            <p>The cart has successfully reached Destination!</p>
            <p>Please Unload Your Luggage....!</p>
            <div>
              <img src={cartImage} alt="Cart" style={{ width: '120px' }} />
            </div>
            <Link to="/selectcart" className="select-cart">
              <button onClick={closePopup}>Close</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCart;
