import React from 'react';

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectDate(new Date(e.target.value));
  };

  return (
    <div>
      <h2>Choose Date</h2>
      <input type="date" onChange={handleDateChange} />
    </div>
  );
};

export default DatePicker;
