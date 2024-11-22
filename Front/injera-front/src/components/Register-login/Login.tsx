import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

// Styled components
const Container = styled.div`
  min-height: 87vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 80px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  margin-top: -50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
  width: 100%;
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
  padding: 12px;
  background-color: #00b398;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const RegisterLink = styled.p`
  text-align: center;
  margin-top: 25px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  text-decoration: underline;
`;

const Message = styled.p`
  color: red;
  margin-top: 10px;
`;
const Login = () => {
  const navigate = useNavigate(); // Defining navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5102/api/Admins/Login', {
        email: email.trim(),
        password: password.trim(),
      });
      if (!response.data || !response.data.token) {
        throw new Error('Invalid server response: No token found');
      }
      console.log(response.data); 
      const token = response.data.token;
    
      localStorage.setItem('token', token);

     
      navigate('/admin/dashboard');
      //window.location.href = '/admin/dashboard'; 
    } catch (error : any) {
      console.error('Login error:', error); 
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Admin Login</Title>
        <Form onSubmit={handleLogin}>
          <InputWrapper>
            <Icon><FaEnvelope /></Icon>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </InputWrapper>
          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </InputWrapper>
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        {error && <Message>{error}</Message>}
        <RegisterLink onClick={() => navigate('/admin/register')}>
            Don't have an account? Register here
          </RegisterLink> {/* Add the register link */}
      </Wrapper>
    </Container>
  );
};

export default Login;
