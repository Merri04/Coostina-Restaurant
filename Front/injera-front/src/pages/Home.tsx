import React from 'react';
import Slideshow from '../components/Slideshow';
import styled from 'styled-components';

const HomeContainer = styled.div`
  position: center;
  height: 100vh; /* Ensure the container takes up the full viewport height */
  color: white; /* Text color, assuming light text over dark images */
`;

const Content = styled.div`
  position: relative;
  z-index: 1; /* Place content above the slideshow */
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 4rem; /* Large font size */
  font-weight: bold; /* Bold font */
  margin: 0; /* Remove default margin */
  margin-left: 200px; /* Add a slight margin on left */
  @media (max-width: 768px) {
    font-size: 6vw; /* Adjust font size for smaller screens */
  }

  @media (max-width: 480px) {
    font-size: 8vw; /* Further adjust for very small screens */
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem; /* Adjust the font size for the subtitle */
  margin-top: 10px; /* Add a slight margin on top */
  margin-left: 200px; /* Add a slight margin on left */
  @media (max-width: 768px) {
    font-size: 3vw; /* Adjust font size for smaller screens */
  }

  @media (max-width: 480px) {
    font-size: 4vw; /* Further adjust for very small screens */
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Slideshow />
      <Content>
      <Title>Welcome to Coostina</Title>
      <Subtitle>We serve the finest Ethiopian and Eritrean cuisine.</Subtitle>
      </Content>
    </HomeContainer>
  );
};

export default Home;
