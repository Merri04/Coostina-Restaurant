import React, { useState } from 'react'; 
import GuestsSelector from '../../components/Reservation/GuestsSelector';
import DatePicker from '../../components/Reservation/DatePicker';
import TimeSelector from '../../components/Reservation/TimeSelector';
import CustomerDetailsForm from '../../components/Reservation/CustomerDetailsForm';
import { Reservation } from '../../components/models/Reservation';
import axios from 'axios';
import styled from 'styled-components';


// Page container with background image
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/images/Background/12.avif');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: #333;
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    background-size: cover;
    
  }
`;

// Flexbox container for form and opening hours
const FormAndHoursContainer = styled.div`
  display: flex;
  gap: 20px; /* Reduced gap */
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin-bottom: 40px; /* Reduced margin */
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px; /* Reduced gap for mobile */
    margin-right: 28px;
  }
`;

// Reservation Form styling - transparent background
const ReservationForm = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px; /* Reduced padding */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    padding: 15px; /* Further reduced padding for mobile */
    max-width: 100%;
  }
`;

// Button styling
const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px; /* Reduced padding */
  font-size: 14px; /* Slightly smaller font */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px; /* Reduced margin */
  width: 100%;
  
  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    padding: 8px 18px; /* Adjusted padding for mobile */
  }
`;

// Time Selector Styling
const TimeSelectionContainer = styled.div`
  display: flex;
  gap: 8px; /* Reduced gap between time buttons */
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

// Opening Hours Section
const OpeningHoursContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

// Input and Label styling
const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px; /* Reduced margin */
  font-size: 1rem; /* Adjusted font size */
  color: white;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px; /* Reduced padding */
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 15px; /* Reduced margin */
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;

  @media (max-width: 768px) {
    padding: 8px; /* Reduced padding */
    font-size: 0.9rem; /* Adjusted font size */
  }
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
// Map Section
const MapContainer = styled.div`
  margin-top: 20px;
  padding: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1150px;
  height: 300px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    height: 250px; /* Adjust map height for mobile */
  }
`;


const ReservationPage: React.FC = () => {
  const [guests, setGuests] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<Reservation | null>(null);

  const handleCustomerSubmit = (reservation: Reservation) => {
    setCustomerDetails(reservation);
  };

  const handleReservationSubmit = () => {
    if (guests && date && time && customerDetails) {
      const reservation: Reservation = {
        ...customerDetails,
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

          {/* Customer Details Form */}
          <CustomerDetailsForm onCustomerSubmit={handleCustomerSubmit} />

          <FormLabel>Number of Guests</FormLabel>
          <InputField type="number" value={guests || ''} onChange={(e) => setGuests(parseInt(e.target.value))} placeholder="Enter number of guests" />
          <DatePicker onSelectDate={setDate} />
          
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
