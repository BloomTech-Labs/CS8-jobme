import styled from 'styled-components';

export const NoneLeftMessage = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 32px;
  color: rgba(55, 11, 199);
`;
export const BrowseView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 5%;
  border: 4px outset rgba(24, 2, 79);
  border-radius: 10px;
`;
export const Title = styled.div`
  font-size: 24px;
  display: flex;
  padding: 0 15px;
  color: rgba(55, 11, 199);
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const Paragraph = Title.extend`
  font-size: 14px;
  color: black;
  padding-left: 4%;

`;
export const Collapser = styled.div`
  height: 100px;
  color: green;
`;
