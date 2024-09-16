import React, { useState } from 'react'; 
import GuestsSelector from '../components/GuestsSelector';
import DatePicker from '../components/DatePicker';
import TimeSelector from '../components/TimeSelector';
import { Reservation } from '../models/Reservation';
import axios from 'axios';
import styled from 'styled-components';

// Page container with background image
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/images/Background/5.jpg'); /* Use your background image */
  background-size: cover;
  background-position: center;
  color: #333;
  min-height: 100vh;
  padding: 40px;
`;

// Flexbox container for form and opening hours
const FormAndHoursContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: stretch; /* Ensure both boxes have the same height */
  flex-wrap: wrap; /* Make them stack on smaller screens */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack on smaller screens */
  }
`;

// Reservation Form styling - transparent background
const ReservationForm = styled.div`
  background-color: rgba(255, 255, 255, 0.3); /* Transparent background */
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
`;

// Button styling
const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background-color: #218838;
  }
`;

// Time Selector Styling
const TimeSelectionContainer = styled.div`
  display: flex;
  gap: 10px; /* Add space between time options */
  flex-wrap: wrap; /* Allows the time options to wrap */
`;

// Opening Hours Section - transparent background
const OpeningHoursContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.3); /* Transparent background */
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const OpeningHoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;

  li {
    margin: 10px 0;
  }
`;

// Map Section, keeping the map unchanged
const MapContainer = styled.div`
  margin-top: 20px;
  padding: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  height: 300px;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  }
`;

// Input and Label styling
const FormLabel = styled.label`
  display: block;
  margin: 15px 0 5px;
  font-size: 1.2rem;
  color: white;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent input background */
  color: #333; /* Dark text for input */
`;

const ReservationPage: React.FC = () => {
  const [guests, setGuests] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const handleReservationSubmit = () => {
    if (guests && date && time) {
      const reservation: Reservation = {
        id: 0,
        customerName: 'Guest',
        email: 'guest@example.com',
        phoneNumber: '0000000000',
        reservationDate: new Date(date.setHours(parseInt(time?.split(':')[0] || '0'))),
        numberOfPeople: guests,
      };

      axios.post('/api/reservations', reservation)
        .then(response => {
          console.log('Reservation successful:', response.data);
          alert('Reservation successful!');
        })
        .catch(error => {
          console.error('Error making reservation:', error);
          alert('Failed to make reservation.');
        });
    } else {
      alert("Please fill in all the details!");
    }
  };

  return (
    <PageContainer>
      {/* Form and Opening Hours in a Flexbox Container */}
      <FormAndHoursContainer>
        {/* Reservation Form */}
        <ReservationForm>
          <h2>Make a Reservation</h2>

          <FormLabel>Number of Guests</FormLabel>
          <InputField type="number" value={guests || ''} onChange={(e) => setGuests(parseInt(e.target.value))} placeholder="Enter number of guests" />

          <FormLabel>Date</FormLabel>
          <DatePicker onSelectDate={setDate} />

          <FormLabel>Time</FormLabel>
          <TimeSelectionContainer>
            <TimeSelector onSelectTime={setTime} />
          </TimeSelectionContainer>

          <Button onClick={handleReservationSubmit}>Confirm Reservation</Button>
        </ReservationForm>

        {/* Opening Hours */}
        <OpeningHoursContainer>
          <h3>Opening Hours</h3>
          <OpeningHoursList>
            <li>Monday: 10:00 - 23:00</li>
            <li>Tuesday: 10:00 - 23:00</li>
            <li>Wednesday: 10:00 - 23:00</li>
            <li>Thursday: 10:00 - 23:00</li>
            <li>Friday: 10:00 - 00:00</li>
            <li>Saturday: 10:00 - 00:00</li>
            <li>Sunday: 11:00 - 23:00</li>
          </OpeningHoursList>
        </OpeningHoursContainer>
      </FormAndHoursContainer>

      {/* Map Section */}
      <MapContainer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.5182683831696!2d10.759041476279395!3d59.922348781859106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e5b64ca9759%3A0x5963f1b87eb77387!2sTrondheimsveien%209%2C%200562%20Oslo%2C%20Norway!5e0!3m2!1sen!2sno!4v1694799546290!5m2!1sen!2sno"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </MapContainer>
    </PageContainer>
  );
};

export default ReservationPage;
