// LoginPage.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import loginAnimation from './animationLogin.json'; // Adicione o arquivo JSON da animação
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;  // Cor de fundo única
  padding: 20px;
`;

const AnimationContainer = styled.div`
  margin-bottom: 30px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f4f4f4; // Mesma cor do fundo
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Input = styled.input`
  padding: 15px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f4f4; // Mesma cor do fundo

  &:focus {
    outline: none;
    border-bottom: 2px solid #FF4B2B;
  }
`;

const LoginButton = styled.button`
  padding: 15px;
  background-color: #FF4B2B;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #e0431f;
  }
`;

const ErrorPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #FF4B2B;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/profile');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Ocultar o erro após 3 segundos
    }
  };

  return (
    <LoginContainer>
      <AnimationContainer>
        <Lottie
          animationData={loginAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: 'auto' }}
        />
      </AnimationContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Entrar</LoginButton>
      </LoginForm>
      <ErrorPopup show={showError}>Usuário ou senha inválidos.</ErrorPopup>
    </LoginContainer>
  );
};

export default LoginPage;
