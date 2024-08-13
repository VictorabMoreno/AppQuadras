// ProfilePage.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, #f4f4f4 50%, #fff 50%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 160px;
  height: 160px;
  object-fit: cover;
  border: 4px solid #fff;
  margin-bottom: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  font-size: 1.2rem;
  color: #555;

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    margin: 8px 0;
  }
`;

const Badge = styled.span`
  display: inline-block;
  background-color: #FF4B2B;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 15px;
`;

const LogoutButton = styled.button`
  padding: 12px 25px;
  background-color: #FF4B2B;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 30px;
  transition: background-color 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 75, 43, 0.2);

  &:hover {
    background-color: #e0431f;
  }
`;

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfilePic src="https://instagram.fbhz1-1.fna.fbcdn.net/v/t51.2885-19/375084672_178473431934566_3607035735551372769_n.jpg?_nc_ht=instagram.fbhz1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=uRlR9i6j1PwQ7kNvgFsI2o4&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYB78uXEeuY8x_8WhzRRvhoOes8MlwR1NCqFXDkb8d5MVQ&oe=66C198B7&_nc_sid=bef7bc" alt={user.name} />
        <ProfileInfo>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Versão do App: 1.0.0</p>
          <p>Tipo de Usuário: Administrador</p>
          <Badge>{user.type}</Badge>
        </ProfileInfo>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
