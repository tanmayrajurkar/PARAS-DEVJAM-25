import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🅿</span>
          <h1>PARAS</h1>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#bookings" className="nav-link">My Bookings</a>
          <a href="#help" className="nav-link">Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
