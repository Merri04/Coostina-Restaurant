// src/pages/Contact.js
import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

function Contact() {
  return (
    <ContactContainer>
      <h2>Contact Us</h2>
      <p>For reservations and inquiries, call us or visit our location.</p>
    </ContactContainer>
  );
}

export default Contact;

