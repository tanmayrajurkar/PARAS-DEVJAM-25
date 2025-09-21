import React, { useState } from 'react';
import Header from './components/Header';
import ParkingMap from './components/ParkingMap';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
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

  return (
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
      </main>
      
      {showSummary && (
        <BookingSummary 
          booking={bookingDetails}
          onClose={handleCloseSummary}
        />
      )}
    </div>
  );
}

export default App;
