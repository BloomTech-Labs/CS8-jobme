import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

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
  margin-bottom: 12px;
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
  height: ${props => (props.large ? '200px' : '100px')};
`;
export const ProfilePic = styled.img`
  width: 70%;
  height: 70%;
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
  width: ${props => (props.small ? '120px' : '175px')};
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 290px;
  height: 260px;
  border: 1px solid rgba(24, 2, 79);
  boder-radius: 3px;
  margin: 1% 0;
  padding-bottom: 20px;
  font-family: 'Roboto Black';
  color: rgba(28, 4, 104);
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  text-shadow: 1px 1px 1px rgba(28, 4, 104, .5);
`;
export const CardPic = styled.img`
  margin: 5px;
  border-radius: 50%;
`;
export const CardName = styled.div`
  font-size: 24px;
  font-color: black;
  padding: 15px 0;
  text-indent: 20px;
  font-size: 24px;
  text-shadow: 1px 1px 1px rgba(28, 4, 104, .5);
`;
export const CardTitle = styled.div`
  font-size: 20px;
  font-color: black;
  padding: 15px 0;
  padding-left: 20px;
  font-size: 20px;
  text-shadow: 1px 1px 1px rgba(28, 4, 104, .5);
`;
