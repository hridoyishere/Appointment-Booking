import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const API = process.env.REACT_APP_SERVER_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API}/api/get/doctors`);
        setDoctors(res.data);
      } catch (err) {
        console.error("Fetch doctors failed:", err);
      }
    };
    fetchDoctors();
  }, [API]);

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/users/login`, { email, password });
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, user };
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Register
  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/users/register`, userData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setLoading(false);
      return { success: true, user: res.data.user };
    } catch (err) {
      console.error("Register error:", err.response?.data?.message || err.message);
      setLoading(false);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Handle booking & Stripe
  const handleBooking = async (bookingData) => {
    setSuccessData(bookingData);
    setBookingLoading(true);
    try {
      const res = await axios.post(`${API}/api/create-checkout-session`, bookingData);
      setBookingLoading(false);
      window.location.href = res.data.url; // redirect to Stripe
    } catch (err) {
      console.error("Booking failed:", err);
      setBookingLoading(false);
      alert("Payment failed");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    handleBooking,
    bookingLoading,
    successData,
    doctors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};