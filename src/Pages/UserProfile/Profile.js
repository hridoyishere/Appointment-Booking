// UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../Components/LoginModal/LoginModal";
import Navbar from "../../Components/NavBar/navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import "./Profile.css";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showBookingDetails, setShowBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  const getUserBookedDoctors = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/booking/${userId}`
      );

      if (response.data.success) {
        setBookings(response.data.bookings);
        console.log("booking", response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching booked doctors:", error);
    }
  };

  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("user");
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        if (parsedUser._id) {
          getUserBookedDoctors(parsedUser._id);
        }
        setLoading(false);
      } else {
        setShowLoginModal(true);
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: "status-badge confirmed",
      pending: "status-badge pending",
      cancelled: "status-badge cancelled",
      completed: "status-badge completed",
    };
    return <span className={statusClasses[status] || "status-badge"}>{status || "unknown"}</span>;
  };

  const getPaymentBadge = (status) => {
    const paymentClasses = {
      paid: "payment-badge paid",
      pending: "payment-badge pending",
      refunded: "payment-badge refunded",
    };
    return <span className={paymentClasses[status] || "payment-badge"}>{status || "unknown"}</span>;
  };

  const formatSymptoms = (symptoms) => {
    if (!symptoms) return "No symptoms reported";
    if (Array.isArray(symptoms)) return symptoms.join(", ");
    if (typeof symptoms === "string") return symptoms;
    return String(symptoms);
  };

  const handleBookingClick = (booking) => {
    setShowBookingDetails(booking);
  };

  const handleLoginSuccess = (userData) => {
    // Handle login success
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowLoginModal(true);
    navigate("/");
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    if (!user) {
      navigate("/");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Show login modal if no user
  if (!user) {
    return (
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="user-profile-container">
      <Navbar />
      
      {/* Header with Welcome */}
      <div className="profile-header">
        <div className="header-top">
          <h1>Welcome back, {user.name || "User"}!</h1>
          <button className="logout-btn-header" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p>Manage your profile and appointments</p>
      </div>

      {/* Tabs Navigation */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          📅 My Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-tab">
            <div className="profile-card">
              <div className="profile-image-section">
                <img
                  src={user.profileImage || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="profile-image"
                />
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
              <div className="profile-details">
                <h2>{user.name || "User Name"}</h2>
                <p className="member-since">
                  Member since {user.memberSince || new Date().getFullYear()}
                </p>

                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email || "Not provided"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{user.phone || "Not provided"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">User ID</span>
                    <span className="info-value">{user._id || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bookings-tab">
            <div className="bookings-header">
              <h2>My Appointments</h2>
              <button className="new-booking-btn" onClick={() => navigate("/doctors")}>
                + New Appointment
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="no-bookings">
                <p>You don't have any appointments yet.</p>
                <button className="book-now-btn" onClick={() => navigate("/doctors")}>
                  Book an Appointment
                </button>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-header">
                      <div className="booking-doctor-info">
                        <h3>{booking.doctorName || "Doctor"}</h3>
                        <p className="appointment-type">{booking.appointmentType || "In-person"}</p>
                      </div>
                      <div className="booking-status">
                        {getStatusBadge(booking.status)}
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                    </div>

                    <div className="booking-details">
                      <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">
                          {booking.date || "Date not set"} at {booking.time || "Time not set"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Fee:</span>
                        <span className="detail-value">${booking.fee || 0}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Reason:</span>
                        <span className="detail-value">{booking.reason || "Not specified"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Symptoms:</span>
                        <span className="detail-value">{formatSymptoms(booking.symptoms)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Emergency Contact:</span>
                        <span className="detail-value">
                          {booking.emergencyContact || "Not provided"} 
                          {booking.emergencyPhone && ` (${booking.emergencyPhone})`}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Booking ID:</span>
                        <span className="detail-value booking-id">{booking._id}</span>
                      </div>
                    </div>

                    <div className="booking-actions">
                      <button
                        className="action-btn view-details"
                        onClick={() => handleBookingClick(booking)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showBookingDetails && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingDetails(null)}
        >
          <div
            className="modal-content booking-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Appointment Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowBookingDetails(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="booking-detail-section">
                <h4>Doctor Information</h4>
                <p><strong>Name:</strong> {showBookingDetails.doctorName || "N/A"}</p>
                <p><strong>Doctor ID:</strong> {showBookingDetails.doctorId || "N/A"}</p>
                <p><strong>Appointment Type:</strong> {showBookingDetails.appointmentType || "In-person"}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Appointment Information</h4>
                <p><strong>Date & Time:</strong> {showBookingDetails.date || "N/A"} at {showBookingDetails.time || "N/A"}</p>
                <p><strong>Booking ID:</strong> {showBookingDetails._id || "N/A"}</p>
                <p><strong>Status:</strong> {getStatusBadge(showBookingDetails.status)}</p>
                <p><strong>First Visit:</strong> {showBookingDetails.isFirstVisit ? "Yes" : "No"}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Payment Information</h4>
                <p><strong>Fee:</strong> ${showBookingDetails.fee || 0}</p>
                <p><strong>Payment Status:</strong> {getPaymentBadge(showBookingDetails.paymentStatus)}</p>
                <p><strong>Insurance:</strong> {showBookingDetails.insuranceProvider || "Not provided"}</p>
                <p><strong>Insurance ID:</strong> {showBookingDetails.insuranceId || "N/A"}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Medical Information</h4>
                <p><strong>Reason:</strong> {showBookingDetails.reason || "Not specified"}</p>
                <p><strong>Symptoms:</strong> {formatSymptoms(showBookingDetails.symptoms)}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Emergency Contact</h4>
                <p><strong>Name:</strong> {showBookingDetails.emergencyContact || "Not provided"}</p>
                <p><strong>Phone:</strong> {showBookingDetails.emergencyPhone || "Not provided"}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Additional Information</h4>
                <p><strong>User ID:</strong> {showBookingDetails.userId || "N/A"}</p>
                <p><strong>Created:</strong> {showBookingDetails.createdAt ? new Date(showBookingDetails.createdAt).toLocaleString() : "N/A"}</p>
                <p><strong>Last Updated:</strong> {showBookingDetails.updatedAt ? new Date(showBookingDetails.updatedAt).toLocaleString() : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;