import React from 'react';
import styled from 'styled-components';


// Styled component for the available time slots heading
const AvailableTimeSlots = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: bold;
`;

// Styled container for the buttons with a gap between them
const TimeButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;  /* Adds a gap between each button */
`;

// Styled component for individual time buttons
const TimeButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
// Define the props for the TimeSelector
interface TimeSelectorProps {
  onSelectTime: (time: string) => void;
}

// Replace <SelectTime> with <AvailableTimeSlots> and correct the timeSlots
const TimeSelector: React.FC<TimeSelectorProps> = ({ onSelectTime }) => {
  const timeSlots = ["14:00", "14:30", "15:00", "18:30", "19:00", "19:30"]; // Removed 25:00

  return (
    <div>
      <AvailableTimeSlots>Choose time</AvailableTimeSlots>
      <TimeButtonsContainer>
        {timeSlots.map(time => (
          <TimeButton key={time} onClick={() => onSelectTime(time)}>
            {time}
          </TimeButton>
        ))}
      </TimeButtonsContainer>
    </div>
  );
};



export default TimeSelector;
