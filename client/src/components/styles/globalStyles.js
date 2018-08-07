import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import trash from '../../images/trash.png';
import edit from '../../images/edit.png';
import email from '../../images/email.png';
import archive from '../../images/archive.png';
import call from '../../images/call.png';

export const BodyContainer = styled.div`
  min-width: 400px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  
`;
export const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')}; 
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  border: ${props => (props.border ? '1px inset rgba(24, 2, 79);' : 'none')};
  
`;
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  color: rgba(24, 2, 79);
  margin-bottom: ${props => (props.signup ? '0px' : '12px')};
  margin-top: ${props => (props.separate ? '8px' : '0')};
  color: rgba(28, 4, 104);
  font-size: 16px;
`;
export const InputTitle = styled.div`
  font-size: 20px;
  color: rgba(55, 11, 199);
  text-indent: 5px;
`;
export const InputBox = styled.input`
  width: 100%;
  border: 1px inset black;
  border-radius: 3px;
  padding: 10px;
  height: ${props => (props.large ? '100px' : '')};
`;
export const InputTextarea = styled.textarea`
  width: 100%;
  border: 1px inset black;
  border-radius: 3px;
  padding: 10px;
  height: ${props => (props.large ? '200px' : '40px')};
`;
export const ProfilePic = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
  margin: 20px;
  border-radius: 50%;
`;
export const DropzoneContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 300px;
  margin: 20px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  padding: 1%;
  justify-content: space-around;
`;
export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: ${props => (props.left ? 'flex-start' : 'center')};
  align-items: center;
  width: ${props => (props.full ? '100%' : '33.33%')};
`;
export const Button = styled.button`
  margin: 5px;
  border: 1px solid rgba(24, 2, 79);
  width: ${props => (props.small ? '120px' : '')};
  width: ${props => (props.landing ? '220px' : '175px')};
  height: ${props => (props.landing ? '65px' : '')};
  font-size: ${props => (props.landing ? '32px' : '24px')};
  color: rgba(24, 2, 79);
  border-radius: 5px;
  background-color: lightblue;
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  &:hover {
    background-color: white;
  }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;
export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Modal = styled.div`
  border: 2px solid black;
  background: gray;
  min-height: 50%;
  min-width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Link = styled(RouterLink)`
  
`;
// CARD GRID
export const GridContainer = BodyContainer.extend`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 290px;
  border: 3px solid rgba(24, 2, 79);
  border-radius: 5%;
  margin: 1% 0;
  padding: 15px;
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;
export const CardPic = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
export const CardName = styled.div`
  font-size: 24px;
  font-color: black;
  padding: 15px 0;
  padding-left: 20px;
  font-size: 24px;
`;
export const CardTitle = styled.div`
  font-size: 20px;
  font-color: black;
  padding: 15px 0;
  text-align: center;
  font-size: 20px;
`;
export const CardButton = Button.extend`
  background-image: ${props => (props.trash ? `url(${trash})` : '')};
  background-image: ${props => (props.edit ? `url(${edit})` : '')};
  background-image: ${props => (props.call ? `url(${trash})` : '')};
  background-image: ${props => (props.email ? `url(${email})` : '')};
  background-image: ${props => (props.archive ? `url(${archive})` : '')};
  background-image: ${props => (props.call ? `url(${call})` : '')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px 30px;
  height: 60px;
  width: 60px;
  border-radius: 50%;

`;
