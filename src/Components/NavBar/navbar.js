// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.js';
import LoginModal from '../LoginModal/LoginModal';
import './navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const location = useLocation();
  const { user, } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { id: 'home', path: '/', label: 'Home', icon: '' },
    { id: 'find-doctor', path: '/find-doctor', label: 'Find a Doctor', icon: '' },
    { id: 'contact', path: '/contact', label: 'Contact', icon: '📞' },
    { id: 'profile', path: '/profile', label: 'Profile', icon: '👨' },
  ];

  const handleLoginSuccess = () => {
    // After successful login, show booking modal
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon"></span>
              <span className="logo-text">Care<span className="logo-highlight">Connect</span></span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right Side Actions */}
          <div className="nav-actions">
            {user ? (
              <div className="user-menu desktop-user-menu">
                <span className="user-name">
                  <span className="user-icon">👤</span>
                  {user.name}
                </span>
              </div>
            ) : (
              <button className="login-btn desktop-login-btn" onClick={() => setShowLoginModal(true)}>
                <span className="login-icon">🔑</span>
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="toggle-bar"></span>
              <span className="toggle-bar"></span>
              <span className="toggle-bar"></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-nav-menu">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <li key={link.id} className="mobile-nav-item">
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    <span className="nav-label">{link.label}</span>
                    
                  </Link>
                </li>
              ))}
              
              {/* Mobile User Actions */}
              
            </ul>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;