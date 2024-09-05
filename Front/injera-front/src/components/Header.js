import React, { useState } from 'react';  // Import useState
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../pages/LanguageContext';  

const HeaderContainer = styled.header`
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
  z-index: 2; /* Ensures it's above the slideshow */
`;

const Logo = styled.h1`
  font-family: 'Arial', sans-serif;
  color: red;
`;

const Nav = styled.nav`
display: flex;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    &:hover {
      color: #ccc;
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
  }
`;
const LanguageSwitcher = styled.div`
  background-color: #222;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {background-color: #f1f1f1}
  }
`;

const Dropdown = styled.div`
  &:hover ${DropdownContent} {
    display: block;
  }
`;

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
  
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
          <Link to="/reservations" onClick={() => setIsOpen(false)}>Reservations</Link>
          <Link to="/restaurant" onClick={() => setIsOpen(false)}>Restaurant</Link>
          <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </Nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={() => toggleLanguage('NO')} style={{ cursor: 'pointer', marginRight: '10px' }}>NO</div>
          <div onClick={() => toggleLanguage('EN')} style={{ cursor: 'pointer' }}>EN</div>
        </div>
      </HeaderContainer>
    );
  }

export default Header;