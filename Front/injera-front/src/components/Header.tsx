import React, { useState } from 'react';  
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Define prop types for styled components where needed
interface NavProps {
  open: boolean;
}

const HeaderContainer = styled.header`
  background-color: #696969;//rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px; /* Add padding to control spacing */
  position: relative;
  z-index: 2; /* Ensures it's above the slideshow */
  width: 100%; /* Ensure full width */
  box-sizing: border-box; /* Ensure padding does not affect width */
`;

const Logo = styled.h1`
  font-family: 'Arial', sans-serif;
  color: #FFA500;
  margin-left: 0;
`;

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 18px;
    &:hover {
      color: #DAA520;
    }
  }

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px 0;
    a {
      display: block;
      margin: 10px 0;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  margin-left: 310px; /* Adjust this value as needed to position it */

  span {
    height: 3px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
    margin-left: 170px;
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>Coostina</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Nav open={isOpen}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/reservation" onClick={() => setIsOpen(false)}>Reservations</Link>
        <Link to="/restaurant" onClick={() => setIsOpen(false)}>Restaurant</Link>
        <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

      </Nav>
    </HeaderContainer>
  );
};

export default Header;
