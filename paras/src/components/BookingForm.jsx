import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ selectedSpot, onBookingSubmit, bookingDetails, setBookingDetails }) => {
  const [formData, setFormData] = useState({
    vehicleType: 'car',
    licensePlate: '',
    duration: 2,
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSpot) {
      const totalCost = selectedSpot.price * formData.duration;
      const bookingData = {
        ...formData,
        spot: selectedSpot,
        totalCost,
        bookingId: `BK${Date.now()}`,
        bookingTime: new Date().toISOString()
      };
      onBookingSubmit(bookingData);
    }
  };

  const calculateTotal = () => {
    if (selectedSpot) {
      return selectedSpot.price * formData.duration;
    }
    return 0;
  };

  return (
    <div className="booking-form">
      <h2>Booking Details</h2>
      
      {selectedSpot ? (
        <div className="selected-spot-info">
          <h3>Selected Spot: {selectedSpot.number}</h3>
          <p>Type: {selectedSpot.type} • ${selectedSpot.price}/hour</p>
          {selectedSpot.features.length > 0 && (
            <p>Features: {selectedSpot.features.join(', ')}</p>
          )}
        </div>
      ) : (
        <div className="no-spot-selected">
          <p>Please select a parking spot to continue</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            required
          >
            <option value="car">Car</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleInputChange}
            placeholder="Enter license plate number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (hours)</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          >
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
            <option value={4}>4 hours</option>
            <option value={8}>8 hours</option>
            <option value={12}>12 hours</option>
            <option value={24}>24 hours</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests (Optional)</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special requirements or notes..."
            rows="3"
          />
        </div>

        {selectedSpot && (
          <div className="cost-summary">
            <div className="cost-item">
              <span>Spot {selectedSpot.number} ({formData.duration} hours)</span>
              <span>${selectedSpot.price * formData.duration}</span>
            </div>
            <div className="cost-total">
              <span>Total Cost</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={!selectedSpot}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
