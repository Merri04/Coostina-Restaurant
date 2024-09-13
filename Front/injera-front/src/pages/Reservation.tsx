import React, { useState } from 'react';
import GuestsSelector from '../components/GuestsSelector';
import DatePicker from '../components/DatePicker';
import TimeSelector from '../components/TimeSelector';
import { Reservation } from '../models/Reservation';
import axios from 'axios';
import styled from 'styled-components';

// Container for the entire page using CSS Grid
const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Two columns: form (larger) and opening hours */
  gap: 20px;
grid-template-rows: 1fr 1fr;
  background-color: #1c1c1c;
  color: white;
  min-height: 100vh;
  padding: 40px;
`;

// Grid column for reservation form
const ReservationForm = styled.div`
  background-color: #FFFAF0;
  color: black;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// Grid column for opening hours
const OpeningHoursContainer = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// Placeholder for an optional third section
const ThirdColumn = styled.div`
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  height: auto;
`;

// Map container
const MapContainer = styled.div`
  grid-column: 1 / 4;  /* Span all three columns */
  margin-top: 40px;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 8px;
  width: 100%;
  height: 300px; /* Height for the map */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

// Form label styling
const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-size: 1.2rem;
  color: white;
`;

// Input styling for guests and time
const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #2c2c2c;
  color: white;
`;

// Navigation buttons
const NavigationButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

const NextButton = styled(NavigationButton)`
  float: right;
`;

const ChangeButton = styled(NavigationButton)`
  float: left;
`;

// Time message
const TimeMessage = styled.p`
  color: lightgray;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 20px;
`;

// Styled opening hours list
const OpeningHoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #fff;

  li {
    margin: 5px 0;
  }
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

      // API call to submit reservation
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
      <ReservationForm>
        <FormLabel>Party size</FormLabel>
        <InputField type="number" value={guests || ''} onChange={(e) => setGuests(parseInt(e.target.value))} placeholder="Enter number of guests" />

        <FormLabel>Date</FormLabel>
        <DatePicker onSelectDate={setDate} />

        <FormLabel>Time</FormLabel>
        <TimeSelector onSelectTime={setTime} />
        <TimeMessage>Your table is required to be returned by 16:00</TimeMessage>

        <div>
          <ChangeButton onClick={() => console.log('Change Venue')}>Change Venue</ChangeButton>
          <NextButton onClick={handleReservationSubmit}>Next</NextButton>
        </div>
      </ReservationForm>

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

      <ThirdColumn>
        {/* You can add more content here */}
      </ThirdColumn>

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
