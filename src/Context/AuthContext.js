import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingloading,setbookingloading]=useState(false)
  const [successData,setSuccessData]=useState('')
  const [doctors,setdoctors]=useState([])

  useEffect(() => {
    // Check localStorage for existing user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

const login = async (email, password) => {
  try {

    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password
      }
    );

    const user = response.data.user;

    // save user locally
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user: user };

  } catch (error) {

    console.error("Login error:", error.response?.data?.message);
    throw error;

  }
};

  const register = async (userData) => {
        setLoading(true);

  try {

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message);
    }

    // Save user locally
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setLoading(false);

    return { success: true, user: data };

  } catch (error) {
    console.error("Register error:", error);
    setLoading(false);
    return { success: false, message: error.message };
  }
};

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleBooking = async (bookingData) => {
    setSuccessData(bookingData)
    setbookingloading(true)
    console.log(bookingData)
    try {
      const res = await axios.post(
        "http://localhost:5000/api/create-checkout-session",
        bookingData
      );
      setbookingloading(false)
      // Redirect to Stripe
      window.location.href = res.data.url; 
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
    setbookingloading(false)
  };


  const getDoctors = async () => {
  const res = await axios.get("http://localhost:5000/api/get/doctors");
  setdoctors(res.data)
  console.log("users",res.data)
  return res;
};


useEffect(()=>{
  getDoctors()
},[])

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    handleBooking,
    bookingloading,
    successData,
    doctors
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
