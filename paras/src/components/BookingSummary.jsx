import React from 'react';
import './BookingSummary.css';

const BookingSummary = ({ booking, onClose }) => {
  if (!booking) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="booking-summary-overlay">
      <div className="booking-summary">
        <div className="summary-header">
          <h2>🎉 Booking Confirmed!</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="summary-content">
          <div className="booking-id">
            <strong>Booking ID:</strong> {booking.bookingId}
          </div>
          
          <div className="summary-section">
            <h3>Parking Details</h3>
            <div className="detail-item">
              <span>Spot Number:</span>
              <span>{booking.spot.number}</span>
            </div>
            <div className="detail-item">
              <span>Spot Type:</span>
              <span>{booking.spot.type}</span>
            </div>
            <div className="detail-item">
              <span>Features:</span>
              <span>{booking.spot.features.length > 0 ? booking.spot.features.join(', ') : 'None'}</span>
            </div>
          </div>

          <div className="summary-section">
            <h3>Vehicle Information</h3>
            <div className="detail-item">
              <span>Vehicle Type:</span>
              <span>{booking.vehicleType.charAt(0).toUpperCase() + booking.vehicleType.slice(1)}</span>
            </div>
            <div className="detail-item">
              <span>License Plate:</span>
              <span>{booking.licensePlate}</span>
            </div>
          </div>

          <div className="summary-section">
            <h3>Booking Information</h3>
            <div className="detail-item">
              <span>Duration:</span>
              <span>{booking.duration} hour{booking.duration > 1 ? 's' : ''}</span>
            </div>
            <div className="detail-item">
              <span>Rate:</span>
              <span>${booking.spot.price}/hour</span>
            </div>
            <div className="detail-item">
              <span>Total Cost:</span>
              <span className="total-cost">${booking.totalCost}</span>
            </div>
            <div className="detail-item">
              <span>Booked At:</span>
              <span>{formatDate(booking.bookingTime)}</span>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="summary-section">
              <h3>Special Requests</h3>
              <p className="special-requests">{booking.specialRequests}</p>
            </div>
          )}

          <div className="summary-actions">
            <button className="action-btn primary" onClick={onClose}>
              Done
            </button>
            <button className="action-btn secondary">
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
