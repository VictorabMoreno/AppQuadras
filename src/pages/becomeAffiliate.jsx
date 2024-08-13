import styled from 'styled-components';
import React from 'react';
import Lottie from 'lottie-react';
import affiliateAnimation from './animationAffiliate.json'; // Certifique-se de que o caminho está correto

const AffiliateContainer = styled.div`
  padding: 40px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #FF4B2B;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const AdvantagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const AdvantageItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  color: #555;
  text-align: left;

  h3 {
    font-size: 1.6rem;
    color: #FF4B2B;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const AnimationContainer = styled.div`
  margin: 40px 0;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const PriceContainer = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 2rem;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  p {
    font-size: 2.5rem;
    color: #FF4B2B;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const PaymentButton = styled.button`
  padding: 15px 30px;
  background-color: #FF4B2B;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0431f;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 1.2rem;
  }
`;

const AffiliatePage = () => {
  const handlePayment = () => {
    // Aqui seria o lugar para implementar o sistema de pagamento
    alert('Pagamento fake processado com sucesso!');
  };

  return (
    <AffiliateContainer>
      <Title>Seja um Afiliado</Title>
      <AnimationContainer>
        <Lottie animationData={affiliateAnimation} loop={true} autoplay={true} style={{ height: 300, width: 300 }} />
      </AnimationContainer>
      <Subtitle>Ganhe mais visibilidade e aumente suas reservas!</Subtitle>
      <AdvantagesContainer>
        <AdvantageItem>
          <h3>Impulso na Divulgação da Quadra</h3>
          <p>Tenha sua quadra em destaque em nossa plataforma, atraindo mais clientes e aumentando suas reservas.</p>
        </AdvantageItem>
        <AdvantageItem>
          <h3>Gerenciamento Inteligente de Reservas</h3>
          <p>Facilite o gerenciamento das suas reservas com ferramentas avançadas e um painel de controle intuitivo.</p>
        </AdvantageItem>
        <AdvantageItem>
          <h3>Adicione Mais de Uma Quadra</h3>
          <p>Gerencie múltiplas quadras em um único lugar, sem complicações.</p>
        </AdvantageItem>
        <AdvantageItem>
          <h3>Relatórios Detalhados</h3>
          <p>Obtenha insights valiosos sobre o desempenho das suas quadras com relatórios detalhados.</p>
        </AdvantageItem>
        <AdvantageItem>
          <h3>Suporte Prioritário</h3>
          <p>Tenha acesso a um suporte dedicado para ajudar com qualquer dúvida ou problema que surgir.</p>
        </AdvantageItem>
      </AdvantagesContainer>
      <PriceContainer>
        <h3>Seja um afiliado por apenas:</h3>
        <p>R$ 59,90/mês</p>
      </PriceContainer>
      <PaymentButton onClick={handlePayment}>Torne-se um Afiliado Agora</PaymentButton>
    </AffiliateContainer>
  );
};

export default AffiliatePage;
