import React, { useState } from 'react';
import SpotCard from './SpotCard';
import './ParkingMap.css';

const ParkingMap = ({ selectedSpot, onSpotSelect, bookingDetails }) => {
  // Mock parking spots data
  const parkingSpots = [
    { id: 1, number: 'A1', type: 'Standard', price: 5, available: true, features: ['Covered'] },
    { id: 2, number: 'A2', type: 'Standard', price: 5, available: true, features: ['Covered'] },
    { id: 3, number: 'A3', type: 'Standard', price: 5, available: false, features: ['Covered'] },
    { id: 4, number: 'A4', type: 'Standard', price: 5, available: true, features: ['Covered'] },
    { id: 5, number: 'B1', type: 'Premium', price: 8, available: true, features: ['Covered', 'EV Charging'] },
    { id: 6, number: 'B2', type: 'Premium', price: 8, available: true, features: ['Covered', 'EV Charging'] },
    { id: 7, number: 'B3', type: 'Premium', price: 8, available: false, features: ['Covered', 'EV Charging'] },
    { id: 8, number: 'B4', type: 'Premium', price: 8, available: true, features: ['Covered', 'EV Charging'] },
    { id: 9, number: 'C1', type: 'Economy', price: 3, available: true, features: [] },
    { id: 10, number: 'C2', type: 'Economy', price: 3, available: true, features: [] },
    { id: 11, number: 'C3', type: 'Economy', price: 3, available: false, features: [] },
    { id: 12, number: 'C4', type: 'Economy', price: 3, available: true, features: [] },
  ];

  return (
    <div className="parking-map">
      <div className="map-header">
        <h2>Select Your Parking Spot</h2>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
      
      <div className="parking-layout">
        <div className="parking-section">
          <h3>Section A - Standard ($5/hour)</h3>
          <div className="spots-grid">
            {parkingSpots.filter(spot => spot.number.startsWith('A')).map(spot => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot?.id === spot.id}
                onSelect={() => onSpotSelect(spot)}
              />
            ))}
          </div>
        </div>
        
        <div className="parking-section">
          <h3>Section B - Premium ($8/hour)</h3>
          <div className="spots-grid">
            {parkingSpots.filter(spot => spot.number.startsWith('B')).map(spot => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot?.id === spot.id}
                onSelect={() => onSpotSelect(spot)}
              />
            ))}
          </div>
        </div>
        
        <div className="parking-section">
          <h3>Section C - Economy ($3/hour)</h3>
          <div className="spots-grid">
            {parkingSpots.filter(spot => spot.number.startsWith('C')).map(spot => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpot?.id === spot.id}
                onSelect={() => onSpotSelect(spot)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingMap;
