// HeroSection.jsx
import React, { useState,useEffect } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import LoginModal from '../LoginModal/LoginModal';
import './hero.css';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
   const [showLoginModal, setShowLoginModal] = useState(false);


       useEffect(() => {
         // Check localStorage for existing user session
         const checkUserSession = () => {
           const storedUser = localStorage.getItem("user");
           if (!storedUser) {
             setShowLoginModal(true); 
           }
         };
     
         checkUserSession();
       }, []);

  const specialists = [
    { id: 1, name: 'Cardiology', icon: '❤️', color: '#FF6B6B', count: 24 },
    { id: 2, name: 'Neurology', icon: '🧠', color: '#4ECDC4', count: 18 },
    { id: 3, name: 'Pediatrics', icon: '👶', color: '#FFB347', count: 32 },
    { id: 4, name: 'Orthopedics', icon: '🦴', color: '#95A5A6', count: 21 },
    { id: 5, name: 'Dermatology', icon: '🔬', color: '#9B59B6', count: 15 },
    { id: 6, name: 'Dentistry', icon: '🦷', color: '#3498DB', count: 27 },
    { id: 7, name: 'Ophthalmology', icon: '👁️', color: '#2ECC71', count: 19 },
    { id: 8, name: 'Psychiatry', icon: '🧘', color: '#F1C40F', count: 13 },
  ];

  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '15+ years',
      rating: 4.9,
      patients: 1200,
      image: '👩‍⚕️',
      available: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '12+ years',
      rating: 4.8,
      patients: 950,
      image: '👨‍⚕️',
      available: true,
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrics',
      experience: '10+ years',
      rating: 4.9,
      patients: 1500,
      image: '👩‍⚕️',
      available: false,
    },
    {
      id: 4,
      name: 'Dr. James Rodriguez',
      specialty: 'Orthopedics',
      experience: '20+ years',
      rating: 5.0,
      patients: 2000,
      image: '👨‍⚕️',
      available: true,
    },
  ];

  const stats = [
    { value: '50+', label: 'Expert Doctors' },
    { value: '20k+', label: 'Happy Patients' },
    { value: '15+', label: 'Years Experience' },
    { value: '24/7', label: 'Emergency Support' },
  ];

  const Booking=(e)=>{
    setSelectedDoctor(e)
    setShowBookingModal(true)
  }

  const handleLoginSuccess =()=>{}

  return (
    <section className="hero-section">
      {showBookingModal? <LoginModal 
        isOpen={showLoginModal}
        onClose={setShowBookingModal}
        onSuccess={handleLoginSuccess}
      />:
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        doctor={selectedDoctor}
      />}
      <div className="hero-container">
        {/* Banner Section */}
        <div className="banner-wrapper">
          <div className="banner-content">
            <div className="banner-text">
              <div className="trust-badge">
                <span className="verified-icon">✓</span>
                Trusted by 20,000+ patients
              </div>
              
              <h1 className="banner-title">
                Book Appointment <br />
                With <span className="highlight">Trusted Doctors</span>
              </h1>
              
              <p className="banner-description">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free. Your health is our priority.
              </p>

              <div className="banner-buttons">
                <button className="book-appointment-btn">
                  Book appointment
                  <span className="btn-arrow">→</span>
                </button>
                <button className="video-consult-btn">
                  <span className="video-icon">▶</span>
                  Video Consult
                </button>
              </div>

              <div className="search-container">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search for doctors or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="banner-image">
              <div className="image-grid">
                <div className="grid-item item1">
                  <img src="/api/placeholder/200/200" alt="Doctor 1" />
                  <div className="doctor-card-mini">
                    <span className="online-indicator"></span>
                    <span>Dr. Sarah</span>
                  </div>
                </div>
                <div className="grid-item item2">
                  <img src="/api/placeholder/200/200" alt="Doctor 2" />
                </div>
                <div className="grid-item item3">
                  <img src="/api/placeholder/200/200" alt="Doctor 3" />
                </div>
                <div className="grid-item item4">
                  <img src="/api/placeholder/200/200" alt="Doctor 4" />
                </div>
                <div className="floating-badge badge1">
                  <span>🏥 24/7</span>
                </div>
                <div className="floating-badge badge2">
                  <span>⭐ 4.9 Rating</span>
                </div>
                <div className="floating-badge badge3">
                  <span>👥 Live Consult</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Find by Specialist Section */}
        <div className="specialists-section">
          <div className="section-header">
            <h2 className="section-title">
              Find by <span className="highlight">Specialist</span>
            </h2>
            <p className="section-subtitle">Browse doctors by their expertise</p>
          </div>

          <div className="specialists-grid">
            {specialists.map((specialist) => (
              <button
                key={specialist.id}
                className={`specialist-card ${selectedSpecialist === specialist.name ? 'active' : ''}`}
                onClick={() => setSelectedSpecialist(specialist.name)}
                style={{ '--card-color': specialist.color }}
              >
                <div className="specialist-icon">{specialist.icon}</div>
                <h3 className="specialist-name">{specialist.name}</h3>
                <span className="doctor-count">{specialist.count} Doctors</span>
              </button>
            ))}
          </div>
        </div>

        {/* Top Doctors Section */}
        <div className="top-doctors-section">
          <div className="section-header">
            <h2 className="section-title">
              Top Doctors to <span className="highlight">Book</span>
            </h2>
            <p className="section-subtitle">Most booked doctors this week</p>
          </div>

          <div className="doctors-grid">
            {topDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image-wrapper">
                  <div className="doctor-avatar">{doctor.image}</div>
                  {doctor.available && (
                    <span className="available-badge">Available Today</span>
                  )}
                </div>
                
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="doctor-details">
                    <span className="detail-item">
                      <span className="detail-icon">⏳</span>
                      {doctor.experience}
                    </span>
                    <span className="detail-item">
                      <span className="detail-icon">👥</span>
                      {doctor.patients}+ patients
                    </span>
                  </div>
                  
                  <div className="doctor-rating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(doctor.rating))}
                      {'☆'.repeat(5 - Math.floor(doctor.rating))}
                    </div>
                    <span className="rating-value">{doctor.rating}</span>
                  </div>

                  <button onClick={()=> Booking(doctor)} className="book-now-btn">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="stats-bar">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;