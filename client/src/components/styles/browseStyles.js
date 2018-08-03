import styled from 'styled-components';

export const NoneLeftMessage = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Roboto Black';
  color: rgba(120, 4, 104);
  text-shadow: 1px 1px 1px darkred;
  font-size: 32px;
`;
export const BrowseView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Roboto Black';
  color: rgba(28, 4, 104);
  border: 1px solid rgba(24, 2, 79);
  border-radius: 5px;
`;
export const Title = styled.div`
  font-size: 24px;
  display: flex;
  padding: 0 15px;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const Paragraph = Title.extend`
  font-size: 14px;
  padding: 0 15px;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const Collapser = styled.div`
  height: 100px;
  color: green;
`;
