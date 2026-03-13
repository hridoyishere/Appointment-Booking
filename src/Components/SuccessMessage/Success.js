import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Success.css";

function Success() {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("bookingdata");
        const userdata = localStorage.getItem("user");

    const data = JSON.parse(storedUser);
    const user = JSON.parse(userdata);

    axios
      .post("http://localhost:5000/api/send-confirmation-email", {data,user})
      .then(() => {
        console.log("Confirmation email sent");
      })
      .catch((err) => console.error(err));
    
    // Show message after animation
    setTimeout(() => setShowMessage(true), 1500);
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      <div className="animation-wrapper">
        <div className="checkmark-circle">
          <div className="checkmark-circle-original"></div>
          <div className="checkmark-check"></div>
        </div>
        
        <div className="success-message" style={{ opacity: showMessage ? 1 : 0 }}>
          <h2 className="payment-title">Payment Successful!</h2>
          <p className="confirmation-text">Confirmation email sent</p>
          
          {/* Home Button */}
          <button className="home-button" onClick={handleHomeClick}>
            <span className="button-icon">🏠</span>
            Back to Home
          </button>
          
          {/* Optional decorative elements */}
          <div className="confetti">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`confetti-piece confetti-${i}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;