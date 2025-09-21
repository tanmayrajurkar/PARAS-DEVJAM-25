import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🅿</span>
          <h1>PARAS</h1>
        </Link>
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/bookings" 
            className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`}
          >
            My Bookings
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Owner Dashboard
          </Link>
          <Link 
            to="/help" 
            className={`nav-link ${location.pathname === '/help' ? 'active' : ''}`}
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
