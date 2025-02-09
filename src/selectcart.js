import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Box, Typography, IconButton, TextField } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import "./selectcart.css";

const carts = [
  { id: 1, location: "Location A", battery: 80, isAvailable: true, imageUrl: "carta.jpg" },
  { id: 2, location: "Location B", battery: 65, isAvailable: false, imageUrl: "cartb.jpg" },
  { id: 3, location: "Location C", battery: 90, isAvailable: true, imageUrl: "cartc.jpg" },
];

const locations = [
  { name: "A Block", value: "11.553898,78.019466" },
  { name: "B Block", value: "11.554303,78.019760" },
  { name: "C Block", value: "11.554621,78.019685" },
  { name: "D Block", value: "11.554621,78.019687" },
  { name: "LIBRARY", value: "11.554437,78.018502" },
  { name: "GIRLS-HOSTEL", value: "11.554958,78.018617" },
  { name: "FOOD-COURT", value: "11.552915,78.019746" },
  { name: "PARKING", value: "11.553579,78.019520" },
  { name: "MBA Block", value: "11.553619,78.020304" },
  { name: "BOYS-HOSTEL", value: "11.552835,78.019963" },
  { name: "GROUND", value: "11.553987, 78.019988" },
];

const SelectCart = () => {
  const [visible, setVisible] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [NextPagedestination, setDestination] = useState("");

  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [visible]);

  const handleSelect = (cartId) => {
    console.log(`Selected Cart: ${cartId}`);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSwap = () => {
    setStartLocation((prev) => {
      setDestination(prev);
      return NextPagedestination;
    });
  };

  // Filter options for destination based on selected start location
  const availableDestinations = locations.filter(
    (loc) => loc.value !== startLocation
  );

  // Filter options for start location based on selected destination
  const availableStartLocations = locations.filter(
    (loc) => loc.value !== NextPagedestination
  );

  const modalStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "white",
    borderRadius: "16px 16px 0 0",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease, transform 0.3s ease-in-out",
    transform: visible ? "translateY(0)" : "translateY(100%)",
  };

  return (
    <div className="select-cart-container">
      <div className="heading">
        <h1>Smart 🛒 Cart</h1>
      </div>
      <div className="content">
        <h2>Select Your Cart</h2>
        <div className="cart-list">
          {carts.map((cart) => (
            <div
              key={cart.id}
              className={`cart-item ${
                cart.isAvailable
                  ? cart.battery > 20
                    ? "border-green"
                    : "border-red"
                  : "border-orange"
              }`}
              onClick={() => handleSelect(cart.id)}
            >
              <img
                src={process.env.PUBLIC_URL + "/" + cart.imageUrl}
                alt="Cart"
                className="cart-image"
              />
              <div className="cart-details-container">
                <div className="cart-location">Location: {cart.location}</div>
                <div className="cart-battery">Battery: {cart.battery}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={visible}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "#f44336" }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2" mb={3}>
            Select Cart Locations
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
            <TextField
              select
              label="Choose Cart Start Location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              SelectProps={{ native: true }}
              fullWidth
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select Start Location</option>
              {availableStartLocations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.name}
                </option>
              ))}
            </TextField>
            <IconButton onClick={handleSwap} sx={{ color: "#1976d2" }}>
              <SwapVertIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
            <LocationOnIcon
              sx={{ color: NextPagedestination ? "#4caf50" : "#ccc" }}
            />
            <TextField
              select
              label="Choose Destination"
              value={NextPagedestination}
              onChange={(e) => setDestination(e.target.value)}
              SelectProps={{ native: true }}
              fullWidth
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select Destination</option>
              {availableDestinations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.name}
                </option>
              ))}
            </TextField>
          </Box>

          <Link
            to={`/GoogleMapsNavigation?destination=${startLocation}&start=A Block&NxtDestination=${NextPagedestination}`}
          >
            <button>Confirm</button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectCart;
