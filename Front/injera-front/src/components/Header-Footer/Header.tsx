import React, { useState } from 'react';  
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to track the route
//import LogoImage from '../..//images/Logo/Logo.png'; // Import the logo image

// Define prop types for styled components where needed
interface NavProps {
  open: boolean;
}

interface HeaderProps {
  sticky: boolean;
}


const HeaderContainer = styled.header<HeaderProps>`
  background-color: #F8F5F1; /* Dark background */
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  position: ${({ sticky }) => (sticky ? 'sticky' : 'relative')}; /* Sticky only if needed */
  top: 0; /* Sticks to the top */
  z-index: 2;
  width: 100%;
  box-sizing: border-box;

  ${({ sticky }) =>
    sticky &&
    `
    box-shadow: 0 4px 2px -2px gray; /* Add shadow when sticky */
    //background-color: #696969; /* Dark background */
  `}
`;

const Logo = styled.img`
height: 80px; /* Adjust the height to fit your design */
width: auto; /* Maintain aspect ratio */
cursor: pointer;
`;

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;
  

  a {
    color: black;
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
    background-color: #F8F5F1; /* Dark background */
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
    background: black;
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
  const location = useLocation(); // Get the current route

  // Conditionally apply the sticky header only on the reservation page
  const isStickyPage = ['/reservation', '/admin/login','/admin/register'].includes(location.pathname);
  

  return (
    <HeaderContainer sticky={isStickyPage}> {/* Apply sticky based on the page */}
       <Link to="/">
    <Logo src="/images/Logo/Logo2.png" alt="Coostina Logo" /> {/* Use the logo image */}
  </Link>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Nav open={isOpen}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/reservation" onClick={() => setIsOpen(false)}>Reservations</Link>
        <Link to="/restaurant" onClick={() => setIsOpen(false)}>Restaurants</Link>
        <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
