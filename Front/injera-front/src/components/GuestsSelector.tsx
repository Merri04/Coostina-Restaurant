import React from 'react';

interface GuestsSelectorProps {
  onSelectGuests: (guests: number) => void;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({ onSelectGuests }) => {
  return (
    <div>
      <h2>Select number of guests</h2>
      <div className="guests-grid">
        {[...Array(10)].map((_, i) => (
          <button key={i} onClick={() => onSelectGuests(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => onSelectGuests(11)}>11+</button>
      </div>
    </div>
  );
};

export default GuestsSelector;
