import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//import image1 from '/images/Background/1.jpg'; 

//import image5 from '../images/5.jpg';
//import image3 from '../images/3.webp';
//import image4 from '../images/4.jpg';

//const images = [image1]; //image1, image5, image3,

const images = ['/images/Background/1.jpg'];  // Using the public folder path directly

const SlideshowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensures it stays behind other content */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    /* Adjustments for smaller screens if necessary */
    background-size: cover; /* Ensure cover works well on smaller devices */
  }
`;

const Slideshow = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <SlideshowContainer
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`
      }}
    />
  );
};

export default Slideshow;
