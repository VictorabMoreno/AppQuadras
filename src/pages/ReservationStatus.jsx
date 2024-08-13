// src/pages/ReservationStatus.js
import styled from 'styled-components';
import React from 'react';
import Lottie from 'lottie-react';
import animationConfirmed from './animationConfirmed.json'; // Animação para confirmado
import animationDenied from './animationDenied.json'; // Animação para negado
import animationProcessing from './animationProcessing.json'; // Animação para em processamento
import { useLocation, useParams } from 'react-router-dom';

const StatusContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #343a40;
    font-weight: 600;
  }

  .animation {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
    }
  }

  p {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #6c757d;
  }

  .details {
    margin-top: 30px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    text-align: left;
  }

  .details h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
    font-weight: 600;
  }

  .details p {
    font-size: 1rem;
    color: #555;
    margin: 5px 0;
  }
`;

const ReservationStatus = () => {
    const { id } = useParams(); // Pega o id da URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || 'Aguardando confirmação por parte do proprietário'; // Obtém o status

    let animationData;
    let message;

    // Detalhes fictícios da reserva para demonstração
    const reservationDetails = {
      name: 'Quadra A',
      day: 'Segunda-feira',
      time: '08:00 - 09:00',
      status: status
    };

    switch (status) {
      case 'Confirmado':
        animationData = animationConfirmed;
        message = 'Sua reserva foi confirmada!';
        break;
      case 'Negado':
        animationData = animationDenied;
        message = 'Infelizmente, sua reserva foi negada.';
        break;
      case 'Em Processamento':
        animationData = animationProcessing;
        message = 'Aguarde enquanto confirmamos sua reserva.';
        break;
      default:
        animationData = null;
        message = 'Status desconhecido.';
    }

    return (
      <StatusContainer>
        {animationData && (
          <Lottie 
            className="animation"
            animationData={animationData} 
            loop={status === 'Em Processamento'} 
          />
        )}
        <h2>{message}</h2>
        <p>{status === 'Em Processamento' ? 'Aguarde enquanto confirmamos sua reserva.' : ''}</p>

        <div className="details">
          <h3>Detalhes da Reserva</h3>
          <p><strong>Quadra:</strong> {reservationDetails.name}</p>
          <p><strong>Dia:</strong> {reservationDetails.day}</p>
          <p><strong>Horário:</strong> {reservationDetails.time}</p>
          <p><strong>Status:</strong> {reservationDetails.status}</p>
        </div>
      </StatusContainer>
    );
};

export default ReservationStatus;
