import styled from 'styled-components';
import React, { useState } from 'react';
import courtsData from '../courtsData.json';
import { useNavigate, useParams } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiClock, FiArrowLeft } from 'react-icons/fi'; // Adicionando ícones
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Carousel from 'react-multi-carousel'; // Biblioteca para carrossel
import 'react-multi-carousel/lib/styles.css'; // Importando estilos para o carrossel

Modal.setAppElement('#root');

// Configuração do carrossel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #FF4B2B;
  padding: 10px;
  width: 100%;
  color: #fff;
  position: absolute;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 16px;
    margin-left: 10px;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #e0e0e0;
    }
  }
`;


const CourtDetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CourtGallery = styled.div`
  width: 100%;
  margin-top:60px;
  max-width: 1000px;
  height: 400px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 250px;
  }

  .react-multi-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const CourtInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLeft = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #FF4B2B;
    font-weight: 700;
    border-bottom: 2px solid #FF4B2B;
    padding-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 15px;
    line-height: 1.8;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    h2 {
      font-size: 1.8rem;
    }
  }
`;

const InfoRight = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 15px;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const DaySelect = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  overflow-x: auto;

  button {
    flex: 0 0 auto;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #FF4B2B;
      color: #fff;
      border: none;
    }
  }
`;

const TimeSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #FF4B2B;
      color: #fff;
      border: none;
    }
  }
`;

const ScheduleButton = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #FF4B2B;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0431f;
  }
`;

const ReviewsContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1000px;
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;

  strong {
    color: #FF4B2B;
    font-size: 1.4rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-top: 5px;
  }
`;

const ModalContent = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
  }

  p {
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: #555;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
const CourtDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const court = courtsData.find(c => c.id === parseInt(id));
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

  if (!court) {
    return <CourtDetailsContainer>Quadra não encontrada.</CourtDetailsContainer>;
  }

  const images = [
    'https://altipisos.com.br/wp-content/uploads/2020/06/altipisos-poliesportiva.jpeg',
    'https://altipisos.com.br/wp-content/uploads/2020/06/altipisos-poliesportiva.jpeg',
    'https://altipisos.com.br/wp-content/uploads/2020/06/altipisos-poliesportiva.jpeg',
    'https://altipisos.com.br/wp-content/uploads/2020/06/altipisos-poliesportiva.jpeg'
  ];

  const days = ["15/out", "16/out", "17/out", "18/out"];
  const availableHours = court.available_hours;

  const handleDaySelect= (day) => {
    setSelectedDay(day);
    setSelectedTime(''); // Reset time selection when changing the day
  };

  const handleTimeSelect= (time) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    Swal.fire({
      title: 'Reserva Confirmada!',
      text: `Sua reserva para a quadra ${court.name} no dia ${selectedDay} às ${selectedTime} foi confirmada.`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    navigate('/'); // Redireciona para a página inicial ou para onde desejar após confirmação
  };

  return (
    <CourtDetailsContainer>
        <Header>
        <button onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1>Detalhes da Quadra</h1>
      </Header>
      <CourtGallery>
        <Carousel responsive={responsive} infinite={true} showDots={true}>
          {images.map((image, index) => (
            <div key={index} className="react-multi-carousel-item">
              <img src={image} alt={`Imagem ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </CourtGallery>
      <CourtInfo>
        <InfoLeft>
          <h2>{court.name}</h2>
          <p><FiMapPin /> {court.location}</p>
          <p><FiDollarSign /> {court.price_per_hour}</p>
          <h3>Descrição</h3>
          <p>{court.description}</p>
        </InfoLeft>
        <InfoRight>
          <h3>Selecione um Dia</h3>
          <DaySelect>
            <button className={selectedDay === 'Segunda' ? 'active' : ''} onClick={() => handleDaySelect('Segunda')}>Segunda</button>
            <button className={selectedDay === 'Terça' ? 'active' : ''} onClick={() => handleDaySelect('Terça')}>Terça</button>
            <button className={selectedDay === 'Quarta' ? 'active' : ''} onClick={() => handleDaySelect('Quarta')}>Quarta</button>
            <button className={selectedDay === 'Quinta' ? 'active' : ''} onClick={() => handleDaySelect('Quinta')}>Quinta</button>
            <button className={selectedDay === 'Sexta' ? 'active' : ''} onClick={() => handleDaySelect('Sexta')}>Sexta</button>
            <button className={selectedDay === 'Sábado' ? 'active' : ''} onClick={() => handleDaySelect('Sábado')}>Sábado</button>
            <button className={selectedDay === 'Domingo' ? 'active' : ''} onClick={() => handleDaySelect('Domingo')}>Domingo</button>
          </DaySelect>

          {selectedDay && (
            <>
              <h3>Selecione um Horário</h3>
              <TimeSelect>
                <button className={selectedTime === '08:00' ? 'active' : ''} onClick={() => handleTimeSelect('08:00')}>08:00</button>
                <button className={selectedTime === '10:00' ? 'active' : ''} onClick={() => handleTimeSelect('10:00')}>10:00</button>
                <button className={selectedTime === '12:00' ? 'active' : ''} onClick={() => handleTimeSelect('12:00')}>12:00</button>
                <button className={selectedTime === '14:00' ? 'active' : ''} onClick={() => handleTimeSelect('14:00')}>14:00</button>
                <button className={selectedTime === '16:00' ? 'active' : ''} onClick={() => handleTimeSelect('16:00')}>16:00</button>
                <button className={selectedTime === '18:00' ? 'active' : ''} onClick={() => handleTimeSelect('18:00')}>18:00</button>
              </TimeSelect>
            </>
          )}

          {selectedDay && selectedTime && (
            <ScheduleButton onClick={handleSchedule}>Agendar Reserva</ScheduleButton>
          )}
        </InfoRight>
      </CourtInfo>
      <ReviewsContainer>
          <h3>Avaliações</h3>
          {court.reviews && court.reviews.length > 0 ? (
            court.reviews.map((review, index) => (
              <ReviewCard key={index}>
                <strong>{review.user}</strong>
                <p>{review.comment}</p>
              </ReviewCard>
            ))
          ) : (
            <p>Esta quadra ainda não possui avaliações.</p>
          )}
        </ReviewsContainer>

      {/* Modal para confirmação de reserva */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmação de Reserva"
        style={{
          content: {
            maxWidth: '500px',
            maxHeight:'300px',
            margin: 'auto',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <ModalContent>
          <h2>Confirmar Reserva</h2>
          <p>Você está prestes a reservar a quadra {court.name} para o dia {selectedDay} às {selectedTime}. Deseja continuar?</p>
          <button onClick={handleConfirm}>Confirmar</button>
        </ModalContent>
      </Modal>
    </CourtDetailsContainer>
  );
};

export default CourtDetails;
