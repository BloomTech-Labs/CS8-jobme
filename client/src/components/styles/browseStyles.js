import styled from 'styled-components';

export const NoneLeftMessage = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 32px;
  color: rgba(24, 2, 79);
`;
export const BrowseView = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  padding: 5%;
  border: 3px solid black;
  border-radius: 10px;
`;
export const Title = styled.div`
  font-size: ${props => (props.big ? '32px' : '24px')};
  display: flex;
  width: 100%;
  margin-top: 3%;
  margin-bottom: 1%;
  color: rgba(24, 2, 79);
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const MatchedAndDesired = Title.extend`
  font-size: 18px;
  color: black;
`;
export const Paragraph = Title.extend`
  font-size: 16px;
  color: black;
  padding-left: 4%;
  margin: 0;
`;
