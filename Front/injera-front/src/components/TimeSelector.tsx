import React from 'react';

interface TimeSelectorProps {
  onSelectTime: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ onSelectTime }) => {
  const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
  return (
    <div>
      <h2>Choose Time</h2>
      {timeSlots.map(time => (
        <button key={time} onClick={() => onSelectTime(time)}>{time}</button>
      ))}
    </div>
  );
};

export default TimeSelector;
