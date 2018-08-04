import styled from 'styled-components';
import bgImg from '../../images/landingbg.jpg';

export const BackgroundContainer = styled.div`
  display: flex;
  justify-content: space-around;
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
  font-family: 'Roboto Black';
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 1200%;
  margin-left: 10%;
`;
export const RegisterAndLoginContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column; 
  justify-content: center;
`;
export const RegisterAndLoginChild = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 900px;
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
`;
export const RegisterTitle = LoginTitle.extend`
`;
export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RegisterMessage = styled.div`
  margin-left: ${props => (props.alert ? '38.5%' : '0')};
  color: ${props => (props.alert ? 'red' : '')};
`;
export const LandingButton = styled.div`
  width: 50%;
  height: ${props => (props.small ? '50px' : '75px')};
  color: ${props => (props.selected ? 'white' : 'rgba(24, 2, 79, .7)')};
  background-color: ${props => (props.selected ? 'rgba(24, 2, 79, .7)' : 'white')};
  border: 1px solid rgba(24, 2, 79);
  font-size: ${props => (props.small ? '24px' : '32px')};
  text-align: center;
  padding-top: 1%;
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
`;
