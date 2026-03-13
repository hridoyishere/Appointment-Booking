// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../Components/LoginModal/LoginModal';
import Navbar from '../../Components/NavBar/navbar';
import Footer from '../../Components/Footer/Footer';
import './Profile.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for existing user session
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("user");
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        // No user found, show login modal
        setShowLoginModal(true);
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Demo User Data - Replace with actual user data from localStorage
  const userData = user ? {
    id: user.id || 1,
    name: user.name || 'John Doe',
    email: user.email || 'john.doe@example.com',
    phone: user.phone || '+1 (555) 123-4567',
    age: user.age || 32,
    gender: user.gender || 'Male',
    bloodGroup: user.bloodGroup || 'O+',
    address: user.address || '123 Main Street, New York, NY 10001',
    profileImage: user.profileImage || 'https://via.placeholder.com/150',
    memberSince: user.memberSince || 'January 2024',
    emergencyContact: user.emergencyContact || {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  } : null;

  // Demo Bookings Data - Filter by user ID in real app
  const bookingsData = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      hospital: 'City General Hospital',
      date: '2024-03-25',
      time: '10:30 AM',
      status: 'confirmed',
      bookingId: 'APT-2024-001',
      fees: '$150',
      paymentStatus: 'paid',
      symptoms: ['Chest pain', 'Shortness of breath'],
      prescription: 'https://example.com/prescription1',
      userId: 1
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      hospital: 'Skin Care Center',
      date: '2024-03-28',
      time: '2:15 PM',
      status: 'pending',
      bookingId: 'APT-2024-002',
      fees: '$120',
      paymentStatus: 'pending',
      symptoms: ['Skin rash', 'Itching'],
      userId: 1
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Williams',
      specialization: 'Neurologist',
      hospital: 'Neurology Institute',
      date: '2024-04-02',
      time: '11:45 AM',
      status: 'cancelled',
      bookingId: 'APT-2024-003',
      fees: '$200',
      paymentStatus: 'refunded',
      symptoms: ['Headaches', 'Dizziness'],
      cancellationReason: 'Schedule conflict',
      userId: 1
    },
    {
      id: 4,
      doctorName: 'Dr. James Wilson',
      specialization: 'Orthopedic',
      hospital: 'Orthopedic Hospital',
      date: '2024-03-20',
      time: '9:00 AM',
      status: 'completed',
      bookingId: 'APT-2024-004',
      fees: '$180',
      paymentStatus: 'paid',
      symptoms: ['Knee pain', 'Swelling'],
      prescription: 'https://example.com/prescription2',
      userId: 1
    }
  ];

  // Demo Messages Data - Filter by user ID in real app
  const messagesData = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      fromEmail: 'sarah.johnson@hospital.com',
      subject: 'Appointment Confirmation',
      message: 'Your appointment has been confirmed for March 25th at 10:30 AM. Please arrive 15 minutes early.',
      date: '2024-03-20T10:30:00',
      read: true,
      type: 'appointment',
      bookingId: 'APT-2024-001',
      userId: 1
    },
    {
      id: 2,
      from: 'City General Hospital',
      fromEmail: 'info@citygeneral.com',
      subject: 'Pre-Appointment Instructions',
      message: 'For your upcoming cardiology appointment, please bring your previous medical records and avoid heavy meals 2 hours before.',
      date: '2024-03-21T14:20:00',
      read: false,
      type: 'general',
      userId: 1
    },
    {
      id: 3,
      from: 'Pharmacy Care',
      fromEmail: 'pharmacy@care.com',
      subject: 'Prescription Ready',
      message: 'Your prescription from Dr. Wilson is ready for pickup. Please bring your insurance card.',
      date: '2024-03-22T09:15:00',
      read: false,
      type: 'prescription',
      userId: 1
    },
    {
      id: 4,
      from: 'Dr. Michael Chen',
      fromEmail: 'michael.chen@skincenter.com',
      subject: 'Follow-up Required',
      message: 'Based on your recent consultation, we recommend a follow-up appointment in 2 weeks. Please schedule at your convenience.',
      date: '2024-03-23T16:45:00',
      read: true,
      type: 'follow-up',
      bookingId: 'APT-2024-002',
      userId: 1
    },
    {
      id: 5,
      from: 'Billing Department',
      fromEmail: 'billing@hospital.com',
      subject: 'Payment Receipt',
      message: 'Thank you for your payment of $150 for appointment APT-2024-001. Receipt attached.',
      date: '2024-03-19T11:30:00',
      read: true,
      type: 'billing',
      userId: 1
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'status-badge confirmed',
      pending: 'status-badge pending',
      cancelled: 'status-badge cancelled',
      completed: 'status-badge completed'
    };
    return <span className={statusClasses[status]}>{status}</span>;
  };

  const getPaymentBadge = (status) => {
    const paymentClasses = {
      paid: 'payment-badge paid',
      pending: 'payment-badge pending',
      refunded: 'payment-badge refunded'
    };
    return <span className={paymentClasses[status]}>{status}</span>;
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    // Mark as read in real app
  };

  const handleBookingClick = (booking) => {
    setShowBookingDetails(booking);
  };

  const handleLoginSuccess = (userData) => {
    
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowLoginModal(true);
    navigate('/');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    // If user closes login modal without logging in, redirect to home
    if (!user) {
      navigate('/');
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
        <Navbar/>
      {/* Header with Welcome */}
      <div className="profile-header">
        <div className="header-top">
          <h1>Welcome back, {userData.name}! 👋</h1>
          <button className="logout-btn-header" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p>Manage your profile, appointments, and messages</p>
      </div>

      {/* Tabs Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          📅 My Bookings ({bookingsData.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages 
          {messagesData.filter(m => !m.read).length > 0 && (
            <span className="message-badge">
              {messagesData.filter(m => !m.read).length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="profile-card">
              <div className="profile-image-section">
                <img src={userData.profileImage} alt={userData.name} className="profile-image" />
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
              <div className="profile-details">
                <h2>{userData.name}</h2>
                <p className="member-since">Member since {userData.memberSince}</p>
                
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">📧 Email</span>
                    <span className="info-value">{userData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📱 Phone</span>
                    <span className="info-value">{userData.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🎂 Age</span>
                    <span className="info-value">{userData.age} years</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⚥ Gender</span>
                    <span className="info-value">{userData.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🩸 Blood Group</span>
                    <span className="info-value blood-group">{userData.bloodGroup}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📍 Address</span>
                    <span className="info-value">{userData.address}</span>
                  </div>
                </div>

                <div className="emergency-contact">
                  <h3>🚨 Emergency Contact</h3>
                  <div className="emergency-details">
                    <p><strong>{userData.emergencyContact.name}</strong> ({userData.emergencyContact.relation})</p>
                    <p>{userData.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bookings-tab">
            <div className="bookings-header">
              <h2>My Appointments</h2>
              <button className="new-booking-btn">+ New Appointment</button>
            </div>
            
            <div className="bookings-list">
              {bookingsData.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-doctor-info">
                      <h3>{booking.doctorName}</h3>
                      <p className="specialization">{booking.specialization}</p>
                    </div>
                    <div className="booking-status">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.paymentStatus)}
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="detail-row">
                      <span className="detail-label">🏥 Hospital:</span>
                      <span className="detail-value">{booking.hospital}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📅 Date:</span>
                      <span className="detail-value">{booking.date} at {booking.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📋 Booking ID:</span>
                      <span className="detail-value booking-id">{booking.bookingId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💰 Fees:</span>
                      <span className="detail-value">{booking.fees}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">🤒 Symptoms:</span>
                      <span className="detail-value">{booking.symptoms.join(', ')}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button 
                      className="action-btn view-details"
                      onClick={() => handleBookingClick(booking)}
                    >
                      View Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <>
                        <button className="action-btn reschedule">Reschedule</button>
                        <button className="action-btn cancel">Cancel</button>
                      </>
                    )}
                    {booking.prescription && (
                      <button className="action-btn prescription">
                        📄 View Prescription
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="messages-tab">
            <div className="messages-header">
              <h2>Messages</h2>
              <button className="compose-btn">+ Compose</button>
            </div>

            <div className="messages-list">
              {messagesData.map((message) => (
                <div 
                  key={message.id} 
                  className={`message-item ${!message.read ? 'unread' : ''}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="message-avatar">
                    {message.from.charAt(0)}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <h4 className="message-from">{message.from}</h4>
                      <span className="message-date">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h5 className="message-subject">{message.subject}</h5>
                    <p className="message-preview">
                      {message.message.substring(0, 100)}...
                    </p>
                    <span className={`message-type ${message.type}`}>
                      {message.type}
                    </span>
                  </div>
                  {!message.read && <span className="unread-dot"></span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content message-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedMessage.subject}</h3>
              <button className="close-btn" onClick={() => setShowMessageModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="message-meta">
                <p><strong>From:</strong> {selectedMessage.from}</p>
                <p><strong>Email:</strong> {selectedMessage.fromEmail}</p>
                <p><strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}</p>
              </div>
              <div className="message-body">
                <p>{selectedMessage.message}</p>
              </div>
              {selectedMessage.bookingId && (
                <div className="message-booking">
                  <p><strong>Related Booking:</strong> {selectedMessage.bookingId}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="reply-btn">Reply</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showBookingDetails && (
        <div className="modal-overlay" onClick={() => setShowBookingDetails(null)}>
          <div className="modal-content booking-details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Appointment Details</h3>
              <button className="close-btn" onClick={() => setShowBookingDetails(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="booking-detail-section">
                <h4>Doctor Information</h4>
                <p><strong>Name:</strong> {showBookingDetails.doctorName}</p>
                <p><strong>Specialization:</strong> {showBookingDetails.specialization}</p>
                <p><strong>Hospital:</strong> {showBookingDetails.hospital}</p>
              </div>
              
              <div className="booking-detail-section">
                <h4>Appointment Information</h4>
                <p><strong>Date & Time:</strong> {showBookingDetails.date} at {showBookingDetails.time}</p>
                <p><strong>Booking ID:</strong> {showBookingDetails.bookingId}</p>
                <p><strong>Status:</strong> {getStatusBadge(showBookingDetails.status)}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Payment Information</h4>
                <p><strong>Fees:</strong> {showBookingDetails.fees}</p>
                <p><strong>Payment Status:</strong> {getPaymentBadge(showBookingDetails.paymentStatus)}</p>
              </div>

              <div className="booking-detail-section">
                <h4>Symptoms</h4>
                <p>{showBookingDetails.symptoms.join(', ')}</p>
              </div>

              {showBookingDetails.cancellationReason && (
                <div className="booking-detail-section cancellation">
                  <h4>Cancellation Reason</h4>
                  <p>{showBookingDetails.cancellationReason}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {showBookingDetails.status === 'confirmed' && (
                <button className="reschedule-btn">Reschedule</button>
              )}
              {showBookingDetails.prescription && (
                <button className="prescription-btn">View Prescription</button>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default UserProfile;