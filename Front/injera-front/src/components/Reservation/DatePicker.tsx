import React from 'react';
import styled from 'styled-components';

const DatePickerHeader = styled.h2` /* Styled component for the header */
  color: white;
  
  margin-bottom: 20px;
  font-size: 1.2rem;
`;
const DatePickerContainer = styled.div` /* Styled container for the date picker */
  margin-bottom: 30px;
  margin-top: -20px;
`;


interface DatePickerProps {
  onSelectDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectDate(new Date(e.target.value));
  };

  return (
    <DatePickerContainer>
      <DatePickerHeader>Choose Date</DatePickerHeader>
      <input type="date" onChange={handleDateChange} />
    </DatePickerContainer>
  );
};

export default DatePicker;
