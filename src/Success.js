import React, { useEffect } from "react";
import axios from "axios";

function Success() {
  // For testing, hardcode your email and service name
  const userEmail = "raikikhan@gmail.com"; // replace with the actual email you want to send
  const serviceName = "Website Development"; // you can change to match the booked service

  useEffect(() => {
    axios
      .post("http://localhost:5000/send-confirmation-email", {
        to: userEmail,
        serviceName: serviceName,
      })
      .then(() => console.log("Confirmation email sent"))
      .catch((err) => console.error(err));
  }, []);

  return <h2>Payment Successful! A confirmation email has been sent.</h2>;
}

export default Success;