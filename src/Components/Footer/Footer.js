// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', url: '#about' },
    { name: 'Our Doctors', url: '#doctors' },
    { name: 'Services', url: '#services' },
    { name: 'Appointments', url: '#appointments' },
    { name: 'Contact Us', url: '#contact' },
  ];

  const specialties = [
    { name: 'Cardiology', url: '#' },
    { name: 'Neurology', url: '#' },
    { name: 'Pediatrics', url: '#' },
    { name: 'Orthopedics', url: '#' },
    { name: 'Dermatology', url: '#' },
  ];

  const contactInfo = [
    { icon: '📍', text: '123 Healthcare Ave, Medical City, MC 12345' },
    { icon: '📞', text: '+1 (555) 123-4567' },
    { icon: '✉️', text: 'info@careconnect.com' },
    { icon: '⏰', text: '24/7 Emergency Services' },
  ];

  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' },
    { icon: '🔗', name: 'LinkedIn', url: '#' },
    { icon: '▶', name: 'YouTube', url: '#' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🏥</span>
              <span className="logo-text">Care<span className="logo-highlight">Connect</span></span>
            </div>
            <p className="footer-description">
              Providing quality healthcare with compassion and excellence. 
              Your trusted partner in health and wellness.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div className="footer-section">
            <h3 className="footer-title">Specialties</h3>
            <ul className="footer-links">
              {specialties.map((specialty, index) => (
                <li key={index}>
                  <a href={specialty.url} className="footer-link">
                    {specialty.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-info">
              {contactInfo.map((item, index) => (
                <li key={index} className="contact-item">
                  <span className="contact-icon">{item.icon}</span>
                  <span className="contact-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter">
          <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
          <p className="newsletter-text">
            Get health tips, updates, and special offers
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} CareConnect Hospital. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="#privacy" className="bottom-link">Privacy Policy</a>
            <a href="#terms" className="bottom-link">Terms of Service</a>
            <a href="#sitemap" className="bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;