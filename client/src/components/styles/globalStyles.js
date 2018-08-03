import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const BodyContainer = styled.div`
  min-width: 400px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5%;
`;
export const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')}; 
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: rgba(24, 2, 79);
  margin-bottom: 8px;
`;
export const InputTitle = styled.div`
  font-size: 20px;
  font-family: 'Roboto Black';
  color: rgba(28, 4, 104);
  text-indent: 5px;
  text-shadow: 1px 1px 1px black
`;
export const InputBox = styled.input`
  width: 100%;
  border: 1px inset rgba(24, 2, 79);
  border-radius: 3px;
  padding: 10px;
  height: ${props => (props.large ? '100px' : '')};
`;
export const InputTextarea = styled.textarea`
  width: 100%;
  border: 1px inset rgba(24, 2, 79);
  border-radius: 3px;
  padding: 10px;
  height: ${props => (props.large ? '200px' : '100px')};
`;
export const ProfilePic = styled.img`
  width: 66%;
  height: 66%;
  margin: 20px;
  border-radius: 50%;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Button = styled.button`
  margin: 5px;
  border: 1px solid rgba(24, 2, 79);
  width: ${props => (props.small ? '130px' : '175px')};
  width: ${props => (props.landing ? '220px' : '175px')};
  height: ${props => (props.landing ? '65px' : '')};
  font-size: ${props => (props.landing ? '32px' : '24px')};
  font-family: 'Roboto Black';
  color: rgba(24, 2, 79);
  border-radius: 5px;
  background: lightblue;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  &:hover {
    background: white;
  }
  &:visited {
    background: gray;
  }
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
  width: 280px;
  height: 200px;
  border: 2px solid black;
  margin: 1% 0;
  padding-bottom: 15px;
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CardPic = styled.img`

`;
export const CardName = styled.div`
  font-size: 24px;
  font-color: black;
  text-indent: 20px;
`;
export const CardTitle = styled.div`
  font-size: 20px;
  font-color: black;
  padding: 10px 0;
  padding-left: 20px;
`;
