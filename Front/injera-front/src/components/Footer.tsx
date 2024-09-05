import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      © 2024 EthioStar. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;
