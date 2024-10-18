import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 0;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      © 2024 Coostina. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;
