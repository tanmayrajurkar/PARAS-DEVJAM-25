import React, { useState, useEffect } from 'react';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSpots: 0,
    occupiedSpots: 0,
    availableSpots: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    bookings: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock dashboard data
  const mockData = {
    totalSpots: 50,
    occupiedSpots: 32,
    availableSpots: 18,
    totalRevenue: 15420,
    todayRevenue: 1240,
    bookings: [
      {
        id: 'BK001',
        spotNumber: 'A1',
        customerName: 'John Doe',
        vehicleType: 'Car',
        licensePlate: 'ABC-123',
        startTime: '2024-01-15T10:00:00Z',
        endTime: '2024-01-15T12:00:00Z',
        duration: 2,
        cost: 10,
        status: 'active'
      },
      {
        id: 'BK002',
        spotNumber: 'B2',
        customerName: 'Jane Smith',
        vehicleType: 'SUV',
        licensePlate: 'XYZ-789',
        startTime: '2024-01-15T09:00:00Z',
        endTime: '2024-01-15T13:00:00Z',
        duration: 4,
        cost: 32,
        status: 'active'
      },
      {
        id: 'BK003',
        spotNumber: 'C1',
        customerName: 'Mike Johnson',
        vehicleType: 'Truck',
        licensePlate: 'DEF-456',
        startTime: '2024-01-15T08:00:00Z',
        endTime: '2024-01-15T16:00:00Z',
        duration: 8,
        cost: 24,
        status: 'completed'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const occupancyRate = dashboardData.totalSpots > 0 
    ? Math.round((dashboardData.occupiedSpots / dashboardData.totalSpots) * 100)
    : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleSpotManagement = () => {
    alert('Spot management functionality would be implemented here');
  };

  const handlePricingUpdate = () => {
    alert('Pricing update functionality would be implemented here');
  };

  const handleReports = () => {
    alert('Reports functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="owner-dashboard">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h1>Owner Dashboard</h1>
        <p>Manage your parking facility efficiently</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${selectedTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setSelectedTab('bookings')}
        >
          Active Bookings
        </button>
        <button 
          className={`tab-btn ${selectedTab === 'management' ? 'active' : ''}`}
          onClick={() => setSelectedTab('management')}
        >
          Management
        </button>
      </div>

      {selectedTab === 'overview' && (
        <div className="dashboard-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🅿️</div>
              <div className="stat-content">
                <h3>Total Spots</h3>
                <span className="stat-value">{dashboardData.totalSpots}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🚗</div>
              <div className="stat-content">
                <h3>Occupied</h3>
                <span className="stat-value">{dashboardData.occupiedSpots}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Available</h3>
                <span className="stat-value">{dashboardData.availableSpots}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Occupancy Rate</h3>
                <span className="stat-value">{occupancyRate}%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <span className="stat-value">{formatCurrency(dashboardData.totalRevenue)}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>Today's Revenue</h3>
                <span className="stat-value">{formatCurrency(dashboardData.todayRevenue)}</span>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card" onClick={handleSpotManagement}>
                <div className="action-icon">⚙️</div>
                <h3>Spot Management</h3>
                <p>Manage parking spots and availability</p>
              </button>

              <button className="action-card" onClick={handlePricingUpdate}>
                <div className="action-icon">💲</div>
                <h3>Update Pricing</h3>
                <p>Modify hourly rates and pricing</p>
              </button>

              <button className="action-card" onClick={handleReports}>
                <div className="action-icon">📋</div>
                <h3>Generate Reports</h3>
                <p>View detailed analytics and reports</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'bookings' && (
        <div className="dashboard-bookings">
          <h2>Active Bookings</h2>
          <div className="bookings-table">
            <div className="table-header">
              <div className="table-cell">Booking ID</div>
              <div className="table-cell">Spot</div>
              <div className="table-cell">Customer</div>
              <div className="table-cell">Vehicle</div>
              <div className="table-cell">Start Time</div>
              <div className="table-cell">Duration</div>
              <div className="table-cell">Cost</div>
              <div className="table-cell">Status</div>
            </div>
            {dashboardData.bookings.map(booking => (
              <div key={booking.id} className="table-row">
                <div className="table-cell">#{booking.id}</div>
                <div className="table-cell">{booking.spotNumber}</div>
                <div className="table-cell">{booking.customerName}</div>
                <div className="table-cell">{booking.vehicleType} - {booking.licensePlate}</div>
                <div className="table-cell">{formatDate(booking.startTime)}</div>
                <div className="table-cell">{booking.duration}h</div>
                <div className="table-cell">{formatCurrency(booking.cost)}</div>
                <div className="table-cell">
                  <span 
                    className={`status-badge ${booking.status}`}
                    style={{ 
                      background: booking.status === 'active' 
                        ? 'var(--success-gradient)' 
                        : 'var(--info-gradient)' 
                    }}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'management' && (
        <div className="dashboard-management">
          <h2>Parking Management</h2>
          <div className="management-grid">
            <div className="management-card">
              <h3>Spot Configuration</h3>
              <p>Configure parking spots, types, and features</p>
              <button className="manage-btn">Configure Spots</button>
            </div>

            <div className="management-card">
              <h3>Pricing Management</h3>
              <p>Set hourly rates for different spot types</p>
              <button className="manage-btn">Manage Pricing</button>
            </div>

            <div className="management-card">
              <h3>Customer Management</h3>
              <p>View and manage customer accounts</p>
              <button className="manage-btn">Manage Customers</button>
            </div>

            <div className="management-card">
              <h3>Analytics & Reports</h3>
              <p>View detailed analytics and generate reports</p>
              <button className="manage-btn">View Analytics</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
