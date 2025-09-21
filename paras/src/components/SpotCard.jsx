import React from 'react';
import './SpotCard.css';

const SpotCard = ({ spot, isSelected, onSelect }) => {
  const handleClick = () => {
    if (spot.available && !isSelected) {
      onSelect(spot);
    }
  };

  return (
    <div 
      className={`spot-card ${!spot.available ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="spot-number">{spot.number}</div>
      <div className="spot-type">{spot.type}</div>
      <div className="spot-price">${spot.price}/hr</div>
      {spot.features.length > 0 && (
        <div className="spot-features">
          {spot.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      )}
      <div className="spot-status">
        {!spot.available ? 'Occupied' : isSelected ? 'Selected' : 'Available'}
      </div>
    </div>
  );
};

export default SpotCard;
