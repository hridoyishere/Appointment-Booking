// FindDoctorPage.jsx
import React, { useState,} from 'react';
import Navbar from '../../Components/NavBar/navbar';
import Footer from '../../Components/Footer/Footer';
import BookingModal from '../../Components/BookingModal/BookingModal';
import { useAuth } from '../../Context/AuthContext';
import './FindDoctor.css';

const FindDoctorPage = () => {
  const {doctors}=useAuth()
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);


      const Booking=(e)=>{
    setSelectedDoctor(e)
    setShowBookingModal(true)
  }

  // Sample specialists data
  const specialists = [
    { id: 1, name: 'All Specialists', icon: '👥', count: 45, color: '#2C7DA0' },
    { id: 2, name: 'Cardiology', icon: '❤️', count: 8, color: '#FF6B6B' },
    { id: 3, name: 'Neurology', icon: '🧠', count: 6, color: '#4ECDC4' },
    { id: 4, name: 'Pediatrics', icon: '👶', count: 10, color: '#FFB347' },
    { id: 5, name: 'Orthopedics', icon: '🦴', count: 7, color: '#95A5A6' },
    { id: 6, name: 'Dermatology', icon: '🔬', count: 5, color: '#9B59B6' },
    { id: 7, name: 'Dentistry', icon: '🦷', count: 4, color: '#3498DB' },
    { id: 8, name: 'Ophthalmology', icon: '👁️', count: 3, color: '#2ECC71' },
    { id: 9, name: 'Psychiatry', icon: '🧘', count: 4, color: '#F1C40F' },
    { id: 10, name: 'Gynecology', icon: '👩', count: 6, color: '#E83E8C' },
    { id: 11, name: 'Urology', icon: '💧', count: 3, color: '#20C997' },
    { id: 12, name: 'ENT', icon: '👂', count: 4, color: '#FD7E14' },
  ];

  // Sample doctors data
  const doctorsData = doctors

  // Filter doctors based on selected specialty and search term
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.education.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });




  return (
    <div className="find-doctor-page">
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        doctor={selectedDoctor}
      />



        <Navbar/>
     <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            Find a <span className="highlight">Doctor</span>
          </h1>
          <p className="page-subtitle">
            Browse our network of 45+ trusted specialists and book your appointment today
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>
          
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Specialists Grid */}
        <div className="specialists-section">
          <h2 className="section-heading">Browse by Specialty</h2>
          <div className="specialists-grid">
            {specialists.map((specialist) => (
              <button
                key={specialist.id}
                className={`specialist-card ${selectedSpecialty === (specialist.name === 'All Specialists' ? 'all' : specialist.name) ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(specialist.name === 'All Specialists' ? 'all' : specialist.name)}
                style={{ '--card-color': specialist.color }}
              >
                <span className="specialist-icon">{specialist.icon}</span>
                <span className="specialist-name">{specialist.name}</span>
                <span className="specialist-count">{specialist.count} doctors</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <span className="results-count">
            {filteredDoctors.length} doctors found
            {selectedSpecialty !== 'all' && ` in ${selectedSpecialty}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          <select className="sort-select">
            <option value="recommended">Sort by: Recommended</option>
            <option value="rating">Sort by: Highest Rating</option>
            <option value="experience">Sort by: Most Experienced</option>
            <option value="fee-low">Sort by: Fee: Low to High</option>
            <option value="fee-high">Sort by: Fee: High to Low</option>
          </select>
        </div>

        {/* Doctors Grid/List */}
        <div className={`doctors-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className={`doctor-card ${viewMode === 'list' ? 'list-card' : ''}`}>
                <div className="doctor-image-wrapper">
                  <div className="doctor-avatar"><img src={doctor.image} alt='avatar'/></div>
                  {doctor.available && (
                    <span className="available-badge">Available Today</span>
                  )}
                </div>
                
                <div className="doctor-info">
                  <div className="doctor-header">
                    <h3 className="doctor-name">{doctor.name}</h3>
                    <span className="doctor-specialty-badge">{doctor.specialty}</span>
                  </div>
                  
                  <div className="doctor-details-grid">
                    <div className="detail-item">
                      <span className="detail-icon">⏳</span>
                      <span className="detail-text">{doctor.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span className="detail-text">{doctor.patients}+ patients</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🎓</span>
                      <span className="detail-text">{doctor.education}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🗣️</span>
                      <span className="detail-text">{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">{doctor.availability}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span className="detail-text">{doctor.fee}</span>
                    </div>
                  </div>

                  <div className="doctor-rating-section">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(doctor.rating) ? 'star filled' : 'star'}>
                          {i < Math.floor(doctor.rating) ? '★' : '☆'}
                        </span>
                      ))}
                      <span className="rating-value">{doctor.rating}</span>
                    </div>
                    <span className="next-available">
                      Next: {doctor.nextAvailable}
                    </span>
                  </div>

                  <div className="doctor-actions">
                    <button className="view-profile-btn">View Profile</button>
                    <button className="book-now-btn" onClick={()=> Booking(doctor)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No doctors found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedSpecialty('all');
                  setSearchTerm('');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredDoctors.length > 0 && (
          <div className="pagination">
            <button className="pagination-btn prev">← Previous</button>
            <div className="page-numbers">
              <button className="page-number active">1</button>
              <button className="page-number">2</button>
              <button className="page-number">3</button>
              <span className="page-dots">...</span>
              <button className="page-number">8</button>
            </div>
            <button className="pagination-btn next">Next →</button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FindDoctorPage;

