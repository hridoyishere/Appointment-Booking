// FindDoctorPage.jsx
import React, { useState,} from 'react';
import Navbar from '../../Components/NavBar/navbar';
import Footer from '../../Components/Footer/Footer';
import BookingModal from '../../Components/BookingModal/BookingModal';
import './FindDoctor.css';

const FindDoctorPage = () => {
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
  const doctorsData = [
    // Cardiology
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: '15 years', patients: 3200, rating: 4.9, education: 'Harvard Medical School', languages: ['English', 'Spanish'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$120', nextAvailable: 'Today' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', experience: '12 years', patients: 2800, rating: 4.8, education: 'Johns Hopkins University', languages: ['English', 'Mandarin'], availability: 'Tue-Sat', image: '👨‍⚕️', available: true, fee: '$150', nextAvailable: 'Tomorrow' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Cardiology', experience: '20 years', patients: 4500, rating: 5.0, education: 'Stanford University', languages: ['English', 'Spanish'], availability: 'Mon-Thu', image: '👩‍⚕️', available: false, fee: '$180', nextAvailable: 'Wed' },
    
    // Neurology
    { id: 4, name: 'Dr. James Wilson', specialty: 'Neurology', experience: '18 years', patients: 2100, rating: 4.9, education: 'Yale University', languages: ['English'], availability: 'Mon-Wed', image: '👨‍⚕️', available: true, fee: '$160', nextAvailable: 'Today' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurology', experience: '14 years', patients: 1800, rating: 4.7, education: 'Columbia University', languages: ['English', 'French'], availability: 'Wed-Sat', image: '👩‍⚕️', available: true, fee: '$140', nextAvailable: 'Tomorrow' },
    { id: 6, name: 'Dr. Robert Taylor', specialty: 'Neurology', experience: '22 years', patients: 3800, rating: 5.0, education: 'Mayo Clinic', languages: ['English'], availability: 'Tue-Fri', image: '👨‍⚕️', available: false, fee: '$200', nextAvailable: 'Fri' },
    
    // Pediatrics
    { id: 7, name: 'Dr. Jennifer Lee', specialty: 'Pediatrics', experience: '10 years', patients: 4200, rating: 4.9, education: 'UCSF', languages: ['English', 'Korean'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$110', nextAvailable: 'Today' },
    { id: 8, name: 'Dr. David Miller', specialty: 'Pediatrics', experience: '16 years', patients: 5100, rating: 4.8, education: 'Children\'s Hospital Boston', languages: ['English'], availability: 'Tue-Sat', image: '👨‍⚕️', available: true, fee: '$130', nextAvailable: 'Tomorrow' },
    { id: 9, name: 'Dr. Maria Garcia', specialty: 'Pediatrics', experience: '8 years', patients: 2900, rating: 4.7, education: 'Texas Children\'s Hospital', languages: ['English', 'Spanish'], availability: 'Mon-Thu', image: '👩‍⚕️', available: true, fee: '$100', nextAvailable: 'Today' },
    
    // Orthopedics
    { id: 10, name: 'Dr. Thomas Brown', specialty: 'Orthopedics', experience: '25 years', patients: 5800, rating: 5.0, education: 'Hospital for Special Surgery', languages: ['English'], availability: 'Mon-Wed', image: '👨‍⚕️', available: true, fee: '$190', nextAvailable: 'Today' },
    { id: 11, name: 'Dr. Patricia Martinez', specialty: 'Orthopedics', experience: '14 years', patients: 3100, rating: 4.8, education: 'NYU Langone', languages: ['English', 'Spanish'], availability: 'Tue-Fri', image: '👩‍⚕️', available: false, fee: '$150', nextAvailable: 'Thu' },
    
    // Dermatology
    { id: 12, name: 'Dr. Amanda White', specialty: 'Dermatology', experience: '12 years', patients: 2400, rating: 4.9, education: 'UCLA Medical Center', languages: ['English'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$140', nextAvailable: 'Today' },
    { id: 13, name: 'Dr. Kevin Park', specialty: 'Dermatology', experience: '9 years', patients: 1900, rating: 4.7, education: 'Duke University', languages: ['English', 'Korean'], availability: 'Wed-Sat', image: '👨‍⚕️', available: true, fee: '$130', nextAvailable: 'Tomorrow' },
    
    // Dentistry
    { id: 14, name: 'Dr. Rachel Green', specialty: 'Dentistry', experience: '15 years', patients: 3500, rating: 4.9, education: 'University of Pennsylvania', languages: ['English'], availability: 'Mon-Thu', image: '👩‍⚕️', available: true, fee: '$90', nextAvailable: 'Today' },
    { id: 15, name: 'Dr. John Smith', specialty: 'Dentistry', experience: '11 years', patients: 2800, rating: 4.8, education: 'NYU Dentistry', languages: ['English', 'Spanish'], availability: 'Tue-Fri', image: '👨‍⚕️', available: false, fee: '$100', nextAvailable: 'Wed' },
    
    // Ophthalmology
    { id: 16, name: 'Dr. Helen Zhang', specialty: 'Ophthalmology', experience: '17 years', patients: 2200, rating: 4.9, education: 'Wilmer Eye Institute', languages: ['English', 'Mandarin'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$160', nextAvailable: 'Today' },
    
    // Psychiatry
    { id: 17, name: 'Dr. William Turner', specialty: 'Psychiatry', experience: '20 years', patients: 1600, rating: 4.9, education: 'McLean Hospital', languages: ['English'], availability: 'Tue-Sat', image: '👨‍⚕️', available: true, fee: '$170', nextAvailable: 'Tomorrow' },
    { id: 18, name: 'Dr. Sophia Chen', specialty: 'Psychiatry', experience: '8 years', patients: 1100, rating: 4.7, education: 'Johns Hopkins', languages: ['English', 'Mandarin'], availability: 'Mon-Thu', image: '👩‍⚕️', available: true, fee: '$150', nextAvailable: 'Today' },
    
    // Gynecology
    { id: 19, name: 'Dr. Laura Martinez', specialty: 'Gynecology', experience: '16 years', patients: 3900, rating: 4.9, education: 'Brigham and Women\'s Hospital', languages: ['English', 'Spanish'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$140', nextAvailable: 'Today' },
    { id: 20, name: 'Dr. Elizabeth Taylor', specialty: 'Gynecology', experience: '22 years', patients: 5200, rating: 5.0, education: 'Mayo Clinic', languages: ['English'], availability: 'Tue-Fri', image: '👩‍⚕️', available: false, fee: '$180', nextAvailable: 'Fri' },
    
    // Urology
    { id: 21, name: 'Dr. Mark Johnson', specialty: 'Urology', experience: '19 years', patients: 2800, rating: 4.8, education: 'Cleveland Clinic', languages: ['English'], availability: 'Mon-Wed', image: '👨‍⚕️', available: true, fee: '$150', nextAvailable: 'Today' },
    
    // ENT
    { id: 22, name: 'Dr. Nancy Davis', specialty: 'ENT', experience: '13 years', patients: 2100, rating: 4.8, education: 'Massachusetts Eye and Ear', languages: ['English'], availability: 'Mon-Fri', image: '👩‍⚕️', available: true, fee: '$130', nextAvailable: 'Tomorrow' },
    { id: 23, name: 'Dr. Richard Brown', specialty: 'ENT', experience: '21 years', patients: 3400, rating: 4.9, education: 'Johns Hopkins', languages: ['English', 'German'], availability: 'Tue-Sat', image: '👨‍⚕️', available: false, fee: '$160', nextAvailable: 'Sat' },
  ];

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
                  <div className="doctor-avatar">{doctor.image}</div>
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

