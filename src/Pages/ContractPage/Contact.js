// ContactPage.jsx
import React, { useState } from 'react';
import Navbar from '../../Components/NavBar/navbar';
import Footer from '../../Components/Footer/Footer';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    preferredContact: 'email'
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const departments = [
    'General Inquiry',
    'Appointments',
    'Billing',
    'Medical Records',
    'Emergency',
    'International Patients',
    'Feedback',
    'Other'
  ];

  const faqs = [
    {
      question: 'What are your visiting hours?',
      answer: 'General visiting hours are from 10:00 AM to 8:00 PM daily. ICU and Emergency have 24/7 visiting with restrictions.'
    },
    {
      question: 'How do I get my medical records?',
      answer: 'You can request medical records through our online portal, by visiting the Medical Records department, or by calling our records department.'
    },
    {
      question: 'Do you accept international insurance?',
      answer: 'Yes, we accept major international insurance providers. Please contact our international patient department for specific inquiries.'
    },
    {
      question: 'How can I provide feedback?',
      answer: 'You can provide feedback through this contact form, our patient feedback kiosks located in the lobby, or by emailing feedback@careconnect.com'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.'
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        message: '',
        preferredContact: 'email'
      });
    }, 5000);
  };

  return (
    <div className="contact-page">
      <Navbar/>
      <div className="contact-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            Get in <span className="highlight">Touch</span>
          </h1>
          <p className="page-subtitle">
            We're here to help you 24/7. Reach out to us through any of the following channels.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="emergency-banner">
          <div className="emergency-icon">🚑</div>
          <div className="emergency-content">
            <h3>For Medical Emergencies</h3>
            <p>If this is a medical emergency, please call our emergency services immediately.</p>
          </div>
          <a href="tel:911" className="emergency-call-btn">
            <span className="call-icon">📞</span>
            Call Emergency
          </a>
        </div>

        {/* Contact Cards Grid */}
        <div className="contact-cards-grid">
          <div className="contact-card">
            <div className="card-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Healthcare Avenue<br />Medical District<br />City, ST 12345</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="card-link">
              Get Directions →
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">📞</div>
            <h3>Call Us</h3>
            <p>Main: +1 (555) 123-4567<br />Emergency: +1 (555) 123-911<br />International: +1 (555) 123-8888</p>
            <a href="tel:+15551234567" className="card-link">
              Call Now →
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">✉️</div>
            <h3>Email Us</h3>
            <p>General: info@careconnect.com<br />Appointments: appointments@careconnect.com<br />Billing: billing@careconnect.com</p>
            <a href="mailto:info@careconnect.com" className="card-link">
              Send Email →
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">⏰</div>
            <h3>Working Hours</h3>
            <p>Emergency: 24/7<br />OPD: Mon-Fri 8AM-8PM<br />Weekends: 9AM-5PM</p>
            <a href="#appointment" className="card-link">
              Book Appointment →
            </a>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="contact-main">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2 className="form-title">Send us a Message</h2>
            <p className="form-subtitle">We'll get back to you within 24 hours</p>
            
            {formStatus.submitted && (
              <div className={`form-alert ${formStatus.success ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Contact Method</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleChange}
                    />
                    <span>Email</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleChange}
                    />
                    <span>Phone</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleChange}
                    />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
                <span className="btn-icon">→</span>
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="contact-info-wrapper">
            {/* Map */}
            <div className="map-container">
              <iframe
                title="Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.98510768458417!3d40.75889697932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="map-iframe"
              ></iframe>
              <div className="map-overlay">
                <button className="get-directions-btn">
                  Get Directions
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-section">
              <h3>Connect With Us</h3>
              <div className="social-links-grid">
                <a href="https://example.com" className="social-link facebook">
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="https://example.com" className="social-link twitter">
                  <span className="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="https://example.com" className="social-link instagram">
                  <span className="social-icon">📷</span>
                  <span>Instagram</span>
                </a>
                <a href="https://example.com" className="social-link linkedin">
                  <span className="social-icon">🔗</span>
                  <span>LinkedIn</span>
                </a>
                <a href="https://example.com" className="social-link youtube">
                  <span className="social-icon">▶</span>
                  <span>YouTube</span>
                </a>
                <a href="https://example.com" className="social-link whatsapp">
                  <span className="social-icon">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button className="faq-question">
                      <span>{faq.question}</span>
                      <span className="faq-icon">▼</span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="additional-options">
          <h2 className="section-title">Other Ways to <span className="highlight">Connect</span></h2>
          
          <div className="options-grid">
            <div className="option-card">
              <div className="option-icon">📱</div>
              <h3>Mobile App</h3>
              <p>Download our app for easy appointment booking and health records access</p>
              <div className="app-buttons">
                <button className="app-store-btn">App Store</button>
                <button className="play-store-btn">Google Play</button>
              </div>
            </div>

            <div className="option-card">
              <div className="option-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time during business hours</p>
              <button className="chat-now-btn">Start Chat</button>
            </div>

            <div className="option-card">
              <div className="option-icon">📹</div>
              <h3>Video Call</h3>
              <p>Schedule a video consultation with our specialists</p>
              <button className="video-call-btn">Schedule Call</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactPage;