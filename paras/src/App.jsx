import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ParkingMap from './components/ParkingMap';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import MyBookings from './components/MyBookings';
import OwnerDashboard from './components/OwnerDashboard';
import Help from './components/Help';
import './App.css';

function App() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
  };

  const handleBookingSubmit = (bookingData) => {
    setBookingDetails(bookingData);
    setShowSummary(true);
    setSelectedSpot(null); // Reset selection after booking
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setBookingDetails(null);
  };

  const HomePage = () => (
    <main className="main-content">
      <div className="container">
        <div className="app-header">
          <h1>Find Your Perfect Parking Spot</h1>
          <p>Select a spot, book your time, and park with confidence</p>
        </div>
        
        <div className="booking-container">
          <div className="booking-left">
            <ParkingMap 
              selectedSpot={selectedSpot}
              onSpotSelect={handleSpotSelect}
              bookingDetails={bookingDetails}
            />
          </div>
          
          <div className="booking-right">
            <BookingForm 
              selectedSpot={selectedSpot}
              onBookingSubmit={handleBookingSubmit}
              bookingDetails={bookingDetails}
              setBookingDetails={setBookingDetails}
            />
          </div>
        </div>
      </div>
      
      {showSummary && (
        <BookingSummary 
          booking={bookingDetails}
          onClose={handleCloseSummary}
        />
      )}
    </main>
  );

  return (
    <Router>
      <div className="app">
        {/* 3D Background Elements */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        
        <div className="geometric-shapes">
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
        </div>
        
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<OwnerDashboard />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
