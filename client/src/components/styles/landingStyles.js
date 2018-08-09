import styled from 'styled-components';
import bgImg from '../../images/landingbg.jpg';

export const BackgroundContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-length: 400px;
  top:0;
  right:0;
  bottom:0;
  left:0;
  position: absolute;

  &::after {
    content: "";
    background: url(${bgImg}) no-repeat center center fixed;
    opacity: .7;
    top:0;
    right:0;
    bottom:0;
    left:0;
    position: absolute;
    z-index: -1;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;

export const AppTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%;
  font-family: 'Roboto Black';
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 1000%;
`;
export const RegisterAndLoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column; 
  justify-content: flex-start;
  padding: 5% 1%;
  padding-bottom: 0;
  background-color: rgba(24, 2, 79, .2);
`;
export const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RegisterContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80%;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;
export const SeekerOrEmployer = styled.div`
  float: ${props => (props.right ? 'right' : 'left')};
`;

export const LandingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  box-sizing: border-box;
  height: ${props => (props.small ? '50px' : '75px')};
  color: ${props => (props.selected ? 'white' : 'rgba(24, 2, 79, .7)')};
  background-color: ${props => (props.selected ? 'rgba(24, 2, 79, .7)' : 'white')};
  border: ${props => (props.selected ? '1px solid rgba(24, 2, 79)' : '6px inset lightgrey')};
  margin: 1%;
  font-size: ${props => (props.small ? '24px' : '32px')};
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
`;
