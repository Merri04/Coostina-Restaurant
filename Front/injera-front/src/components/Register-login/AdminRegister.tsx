import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock} from 'react-icons/fa'; // Importing icons


// Styled components
const Container = styled.div`
  min-height: 87vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 5px;

`;

const Wrapper = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
    //max-width: 90%;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  padding: 15px;
`;



const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-top: -20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 13px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Icon = styled.div`
  color: #333;
  margin-right: 10px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  background: none;
  outline: none;
  font-size: 1rem;
`;


const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00b398;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px;
`;

const Message = styled.p<{ success?: boolean }>`
  color: ${({ success }) => (success ? 'green' : 'red')};
  margin-top: 5px;
`;

const LinkMessage = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
  text-align: center;
  with: 100%;

  a {
    color: #0056b3;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #003f7f;
    }
  }
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate the email
    if (!validateEmail(email)) {
      setError('Invalid email format. Email must contain @');
      return;
    }

    // Validate the password
    if (!validatePassword(password)) {
      setError('Password must be at least 7 characters long, contain one capital letter, and one number.');
      return;
    }
    console.log('Sending data:', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
  });
    try {
      const response = await axios.post('http://localhost:5102/api/Admins/Register', {
        firstName,
        lastName,
        email,
        password
      });
      if (response.status === 200) {
        setSuccess('Registration successful!');
        window.location.href = '/admin/login';
    }

    } catch (error) {
      setError('Failed to register. Try again.');
    }
  };

  return (
    <Container>
      <Wrapper>
        <FormSection>
        <Title>Admin Registration</Title>
        <Form onSubmit={handleRegister}>
          <InputWrapper>
            <Icon><FaUser /></Icon>
            <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </InputWrapper>
          <InputWrapper>
            <Icon><FaUser /></Icon>
            <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </InputWrapper>
          <InputWrapper>
            <Icon><FaEnvelope /></Icon>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputWrapper>
          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </InputWrapper>
          <Button type="submit">Register</Button>
          <LinkMessage>
            Already registered? <a href="/admin/login">Log in here</a>.
          </LinkMessage>
        </Form>
        {error && <Message>{error}</Message>}
        {success && <Message success>{success}</Message>}
        
      </FormSection>
      
    </Wrapper>
  </Container>
    );
  };

  export default Register;
