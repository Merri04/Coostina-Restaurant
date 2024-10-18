import React, { useState } from 'react';
import { Reservation } from '../models/Reservation';
import styled from 'styled-components';

// Styling for the form container
const FormContainer = styled.div`
  padding: 1px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: 'Arial', sans-serif;

  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
`;

// Styling for the input fields
const InputField = styled.input`
  width: calc(100% - 20px);  /* Ensure the input fits within the form container */
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  font-size: 0.8rem;
  background-color: black;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #333;
    background-color: #fff;
  }
`;

// Styling for the submit button


interface CustomerDetailsFormProps {
  onCustomerSubmit: (reservation: Reservation) => void;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ onCustomerSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Form validation
  const isValidForm = () => {
    return customerName && email && phoneNumber;
  };

  const handleSubmit = () => {
    if (!isValidForm()) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    // Create new Reservation object
    const newReservation: Reservation = { 
      id: 0, // This will be auto-generated later
      customerName,
      email,
      phoneNumber,
      reservationDate: new Date(), // Placeholder for the reservation date
      numberOfPeople: 0, // Will be set later
    };

    // Pass the reservation object to the parent component
    onCustomerSubmit(newReservation);
  };

  return (
    <FormContainer> 
      <InputField 
        type="text" 
        placeholder="Eanter your name" 
        value={customerName} 
        onChange={(e) => setCustomerName(e.target.value)} 
      />
      <InputField 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <InputField 
        type="tel" 
        placeholder=" Enter your phone" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
      />
      
    </FormContainer>
  );
};

export default CustomerDetailsForm;
