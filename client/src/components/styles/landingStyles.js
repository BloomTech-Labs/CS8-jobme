import styled from 'styled-components';
import img from '../../images/hand.jpeg';

export const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  max-length: 1400px;
  min-length: 600px;
  width: 100%;
  position:fixed !important;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background: url(${img}) no-repeat center center fixed;
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
  margin-bottom: 20%;
  font-size: 100px;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
`;
export const RegisterAndLoginContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column; 
  margin-top: 5%;
`;
export const LoginTitle = styled.div`
  display: flex;
  justify-content: center; 
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
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
