// src/pages/MyReservations.js
import styled, { keyframes, css } from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

// Animações
const fillProcessing = keyframes`
  0% {
    width: 50%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 50%;
  }
`;

const fillConfirmadoNegado = keyframes`
  0% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
`;

// Container das reservas
const ReservationsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

// Card de reserva
const ReservationCard = styled.div`
  background-color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 15px 0;
  width: 100%;
  max-width: 700px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
`;

// Grid interno
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Container da imagem e informações
const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

// Imagem da quadra
const CourtImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #f0f0f0;
`;

// Detalhes da quadra
const CourtDetails = styled.div`
  flex: 1;
  h2 {
    font-size: 1.4rem;
    margin: 0;
    color: #333;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 5px 0;
  }
`;

// Barra de status
const StatusBar = styled.div`
  height: 8px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-top: 20px;
`;

// Barra de progresso com animações condicionais
const ProgressBar = styled.div`
  height: 100%;
  border-radius: 10px;
  width: ${({ progress }) => progress}%;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Confirmado':
        return '#4CAF50'; // Verde para confirmado
      case 'Negado':
        return '#F44336'; // Vermelho para negado
      case 'Em Processamento':
        return '#FFC107'; // Amarelo para processamento
      default:
        return '#e0e0e0';
    }
  }};
  animation: ${({ status }) => {
    switch (status) {
      case 'Confirmado':
      case 'Negado':
        return css`${fillConfirmadoNegado} 1s ease-in-out`;
      case 'Em Processamento':
        return css`${fillProcessing} 2s infinite ease-in-out`;
      default:
        return 'none';
    }
  }};
  transition: width 0.5s ease-in-out;
`;

// Estilos dos detalhes e link
const DetailsLink = styled(Link)`
  margin-top: 20px;
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

const MyReservations = () => {
  // Dados fictícios para demonstração
  const reservations = [
    { id: 1, name: 'Quadra A', image: '../images.jfif', status: 'Aguardando confirmação', progress: 50, day: 'Segunda-feira', time: '08:00 - 09:00' },
    { id: 2, name: 'Quadra B', image: '../images.jfif', status: 'Confirmado', progress: 100, day: 'Quarta-feira', time: '09:00 - 10:00' },
    { id: 3, name: 'Quadra C', image: '../images.jfif', status: 'Negado', progress: 100, day: 'Sexta-feira', time: '10:00 - 11:00' },
    { id: 4, name: 'Quadra D', image: '../images.jfif', status: 'Em Processamento', progress: 50, day: 'Sábado', time: '11:00 - 12:00' },
    // Adicione mais reservas conforme necessário
  ];

  return (
    <ReservationsContainer>
      {reservations.map(reservation => (
        <ReservationCard key={reservation.id}>
          <Grid>
            <CardContent>
              <CourtImage src={reservation.image} alt={`Imagem da quadra ${reservation.name}`} />
              <CourtDetails>
                <h2>{reservation.name}</h2>
                <p>Dia: {reservation.day}</p>
                <p>Horário: {reservation.time}</p>
              </CourtDetails>
            </CardContent>
            <DetailsLink to={`/reservation-status/${reservation.id}?status=${encodeURIComponent(reservation.status)}`}>
              Ver Detalhes
            </DetailsLink>
          </Grid>
          <StatusBar>
            <ProgressBar status={reservation.status} progress={reservation.progress} />
          </StatusBar>
        </ReservationCard>
      ))}
    </ReservationsContainer>
  );
};

export default MyReservations;
