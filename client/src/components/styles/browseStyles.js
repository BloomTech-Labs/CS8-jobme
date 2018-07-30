import styled from 'styled-components';

export const NoneLeftMessage = styled.div`
  font-size: 24px;
`;
export const BrowseView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Title = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const Paragraph = Title.extend`
  font-size: 14px;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const Collapser = styled.div`
  height: 100px;
  color: green;
`;
