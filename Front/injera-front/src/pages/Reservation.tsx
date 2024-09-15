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
  background-image: url('/path-to-your-background-image.jpg'); /* Background Image */
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

// Reservation Form styling
const ReservationForm = styled.div`
  background-color: white;
  color: black;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Button styling
const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background-color: #45a049;
  }
`;

// Opening Hours Section
const OpeningHoursContainer = styled.div`
  background-color: #fafafa;
  color: #333;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OpeningHoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.1rem;

  li {
    margin: 8px 0;
  }
`;

// Map Section, taking up full width below the form and opening hours
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
  font-size: 1.1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
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
          <TimeSelector onSelectTime={setTime} />

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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509437!2d144.95592331550483!3d-37.817209742021955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e2c4b913%3A0x9048e9b8c84b29a5!2sEureka%20Tower!5e0!3m2!1sen!2sau!4v1630498186226!5m2!1sen!2sau"
          loading="lazy"
        ></iframe>
      </MapContainer>
    </PageContainer>
  );
};

export default ReservationPage;
