import styled from 'styled-components';

export const WrapperHomePage = styled.div`
min-height: 100vh;
display: flex;
width: 35vw; 
align-items: center;
justify-content: center;
margin-left: auto;
margin-right: auto;
`;

export const HomeTitle = styled.p`
  max-width: 600px;
  font-size: 32px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 26px;
  }
`;