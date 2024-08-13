import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import courtsData from '../courtsData.json';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2C3E50; /* Cor de fundo escura para melhor contraste */
  border-bottom: 1px solid #E0E0E0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #ECF0F1; /* Cor clara para contraste com o fundo escuro */
  cursor: pointer;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #34495E; /* Borda mais escura para contraste */
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    background-color: #ECF0F1; /* Fundo claro */
    color: #2C3E50; /* Texto escuro para contraste */

    @media (max-width: 768px) {
      display: ${({ show }) => (show ? 'block' : 'none')};
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-left: 20px;
    font-size: 16px;
    color: #ECF0F1;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #FF4B2B;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const AffiliateButton = styled(Link)`
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #FF4B2B;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E74C3C;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileIcons = styled.div`
  display: none;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }

  svg {
    color: #FF4B2B;
    font-size: 24px;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 200px;
  z-index: 10;

  a {
    padding: 10px 20px;
    color: #2C3E50;
    text-decoration: none;
    border-bottom: 1px solid #E0E0E0;

    &:hover {
      background-color: #F5F5F5;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const CourtsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const CourtCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;

    @media (max-width: 768px) {
      height: 150px;
    }
  }

  div {
    padding: 20px;

    h3 {
      font-size: 18px;
      color: #2C3E50; /* Cor escura para contraste */
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: #7D7D7D;
      margin-bottom: 8px;
    }

    button {
      padding: 10px 20px;
      background-color: #FF4B2B;
      color: #FFFFFF;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #E74C3C;
      }
    }
  }

  @media (max-width: 768px) {
    div {
      padding: 15px;

      h3 {
        font-size: 16px;
      }

      p {
        font-size: 12px;
      }

      button {
        padding: 8px 16px;
      }
    }
  }
`;

const Home = () => {
  const [courts, setCourts] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // Simulando a chamada da API
    setCourts(courtsData);
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      <Header>
        <Logo>App de Quadras</Logo>
        <SearchContainer show={showSearchBar}>
          <input type="text" placeholder="Buscar quadras..." />
        </SearchContainer>
        <Nav>
          <Link to="/my-reservations">Meus Agendamentos</Link>
          <Link to="/profile">Meu Perfil</Link>
          <AffiliateButton to="/become-affiliate">Ser um Afiliado</AffiliateButton>
        </Nav>
        <MobileIcons>
          <FaSearch onClick={toggleSearchBar} />
          <FaUserCircle onClick={toggleMobileMenu} />
        </MobileIcons>
        {showMobileMenu && (
          <MobileMenu>
            <Link to="/my-reservations">Meus Agendamentos</Link>
            <Link to="/profile">Meu Perfil</Link>
            <Link to="/become-affiliate">Ser um Afiliado</Link>
          </MobileMenu>
        )}
      </Header>
      <CourtsList>
        {courts.map(court => (
          <CourtCard key={court.id}>
            <img src={court.image} alt={court.name} />
            <div>
              <h3>{court.name}</h3>
              <p>{court.location}</p>
              <p>{`R$${court.price_per_hour}/hora`}</p>
              <button onClick={() => window.location.href = `/court/${court.id}`}>Ver Detalhes</button>
            </div>
          </CourtCard>
        ))}
      </CourtsList>
    </div>
  );
};

export default Home;