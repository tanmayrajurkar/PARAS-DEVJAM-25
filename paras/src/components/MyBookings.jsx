import React, { useState, useEffect } from 'react';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed, cancelled

  // Mock user session data
  const userSession = {
    userId: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  // Mock bookings data
  const mockBookings = [
    {
      id: 'BK001',
      spotNumber: 'A1',
      spotType: 'Standard',
      location: 'Downtown Parking',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T12:00:00Z',
      duration: 2,
      totalCost: 10,
      status: 'active',
      vehicleType: 'Car',
      licensePlate: 'ABC-123',
      bookingDate: '2024-01-15T09:30:00Z'
    },
    {
      id: 'BK002',
      spotNumber: 'B2',
      spotType: 'Premium',
      location: 'Mall Parking',
      startTime: '2024-01-14T14:00:00Z',
      endTime: '2024-01-14T18:00:00Z',
      duration: 4,
      totalCost: 32,
      status: 'completed',
      vehicleType: 'SUV',
      licensePlate: 'XYZ-789',
      bookingDate: '2024-01-14T13:45:00Z'
    },
    {
      id: 'BK003',
      spotNumber: 'C1',
      spotType: 'Economy',
      location: 'Airport Parking',
      startTime: '2024-01-13T08:00:00Z',
      endTime: '2024-01-13T20:00:00Z',
      duration: 12,
      totalCost: 36,
      status: 'completed',
      vehicleType: 'Car',
      licensePlate: 'DEF-456',
      bookingDate: '2024-01-13T07:30:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--success-gradient)';
      case 'completed': return 'var(--info-gradient)';
      case 'cancelled': return 'var(--warning-gradient)';
      default: return 'var(--accent-gradient)';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  const handleExtendBooking = (bookingId) => {
    // Mock extend functionality
    alert('Extend booking functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="my-bookings">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>Loading your bookings...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Welcome back, {userSession.name}</p>
      </div>

      <div className="bookings-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Bookings
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <h3>No bookings found</h3>
            <p>You don't have any bookings for the selected filter.</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="booking-id">
                  <h3>#{booking.id}</h3>
                  <span 
                    className="status-badge"
                    style={{ background: getStatusColor(booking.status) }}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="booking-cost">
                  <span className="cost">${booking.totalCost}</span>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <span className="label">Spot:</span>
                  <span className="value">{booking.spotNumber} ({booking.spotType})</span>
                </div>
                <div className="detail-row">
                  <span className="label">Location:</span>
                  <span className="value">{booking.location}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Vehicle:</span>
                  <span className="value">{booking.vehicleType} - {booking.licensePlate}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Duration:</span>
                  <span className="value">{booking.duration} hours</span>
                </div>
                <div className="detail-row">
                  <span className="label">Start Time:</span>
                  <span className="value">{formatDate(booking.startTime)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">End Time:</span>
                  <span className="value">{formatDate(booking.endTime)}</span>
                </div>
              </div>

              <div className="booking-actions">
                {booking.status === 'active' && (
                  <>
                    <button 
                      className="action-btn extend-btn"
                      onClick={() => handleExtendBooking(booking.id)}
                    >
                      Extend Booking
                    </button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                <button className="action-btn details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
