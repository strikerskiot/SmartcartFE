import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Trackcart_module.css"; // Import the CSS
import cartImage from "./cart_1.img-removebg-preview.png"; // Your cart image
import lorryImage from "./cart_1.img-removebg-preview.png"; // Path to the lorry image or emoji image

const TrackCart = () => {
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const startLocation = "11.553898,78.019466"; // Start location from URL query parameter
  // const endLocation = params.get("destination"); // End location from URL query parameter
  const startLocation = "11.553898,78.019466"; // Default start location
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");
  const NextPagedestination = queryParams.get("NxtDestination");

  const [distance, setDistance] = useState(2); // Initial distance set to 2 km
  const [time, setTime] = useState(20); // Initial time set to 20 seconds)
  const [cartPosition, setCartPosition] = useState(0); // Cart position (0%)
  const [isTracking, setIsTracking] = useState(false); // Track state
  const [isArrived, setIsArrived] = useState(false); // Whether the cart has arrived at its destination

  // Effect: Update cart's position dynamically
  useEffect(() => {
    if (isTracking && distance > 0 && time > 0) {
      const totalDistance = 100; // The full screen width (100%)
      const totalTime = time; // Total time to reach the destination

      const interval = setInterval(() => {
        // Calculate the progress based on remaining distance and time
        const progressPerSecond = totalDistance / totalTime; // How much to move every second
        setCartPosition((prev) => Math.min(prev + progressPerSecond, 100)); // Increase position (up to 100%)
        setDistance((prev) => Math.max(prev - 0.001, 0)); // Decrease distance
        setTime((prev) => Math.max(prev - 1, 0)); // Decrease time
      }, 1000);

      return () => clearInterval(interval);
    } else if (distance <= 0 || time <= 0) {
      // When distance or time reaches zero, set the cart to the right (100%)
      setCartPosition(100);
      setIsArrived(true); // Cart has arrived, show the popup
    }
  }, [isTracking, distance, time]);

  // Format time as minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Start Tracking
  const startTracking = () => setIsTracking(true);

  // Close the popup
  const closePopup = () => setIsArrived(false);

  return (
    <div className="track-cart-container">
      {/* Road Background */}
      <div className="road-background">
        <img
          src={cartImage}
          alt="Cart"
          className="cart-image"
          style={{
            left: `${cartPosition}%`, // Dynamically update position
          }}
        />
      </div>

      {/* Cart Info */}
      <div className="cart-info">
        <h2>Cart Is Heading To Your Location</h2>
        {!isTracking ? (
          <button onClick={startTracking}>Start Tracking</button>
        ) : (
          <div>
            <p>
              <strong>Estimated Distance:</strong> {distance.toFixed(2)} km
            </p>
            <p>
              <strong>Estimated Time:</strong> {formatTime(time)}
            </p>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/${startLocation || ""}/${destination || ""}`,
                  "_blank"
                )
              }
            >
              Track on Map
            </button>
          </div>
        )}
      </div>

      {/* Popup when cart has arrived */}
      {isArrived && (
        <div className="popup">
          <div className="popup-content">
            <h3>
               Your Cart Has Arrived at the Location!
            </h3>
            <p>Thank you for your patience!.</p>
            <p>Waiting For Load...!</p>
            <div className="popup-cart-image">
              <img src={cartImage} alt="Cart" style={{ width: "120px" }} />
            </div>
            <Link
             to={`/Trackcart?destination=${NextPagedestination}&start=${destination}`}          >
             <button className="submit-button">DONE</button>
           </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCart;

