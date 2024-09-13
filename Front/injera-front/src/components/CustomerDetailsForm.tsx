import React, { useState } from 'react';
import { Reservation } from '../models/Reservation';

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
    <div>
      <h2>Enter your contact details</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={customerName} 
        onChange={(e) => setCustomerName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="tel" 
        placeholder="Phone" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CustomerDetailsForm;
