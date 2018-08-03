import styled from 'styled-components';
import bgImg from '../../images/landingbg.jpg';

export const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  /* min-length: 600px; */
  width: 100%;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background: url(${bgImg}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: .7;
`;
export const AppTitle = styled.div`
  display: flex;
  align-items: center; 
  width: 30%;
  margin-right: 10%;
`;
export const TitleBox = styled.div`
  display: flex;
  font-family: 'Roboto Black';
  align-items: center; 
  height: 300px;
  position: absolute;
  top: auto;
  right:0;
  bottom: auto;
  left:0;
  z-index: -1;
  font-size: 1300%;
  color: white;
  padding-left: 15%;
  text-shadow: 1px 1px 2px black;
  background: rgba(24, 2, 79, 0.3);
`;
export const RegisterAndLoginContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  background: rgba(24, 2, 79, 0.3);
`;
export const LoginTitle = styled.div`
  display: flex;
  justify-content: center; 
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px black
`;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;
export const RegisterTitle = LoginTitle.extend`
`;
export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;
export const RegisterMessage = styled.div`
  margin-left: ${props => (props.alert ? '38.5%' : '0')};
  color: ${props => (props.alert ? 'red' : '')};
`;

export const ButtonNotClicked = styled.div`
  background:grey;
`;

export const ButtonClicked = styled.div`
  background:lightblue
`;
