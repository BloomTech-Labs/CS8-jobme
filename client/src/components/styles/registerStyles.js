
import styled from 'styled-components';

export const RegisterBanner = styled.div`
  font-size: 30px;
`;
export const RegisterMessage = styled.div`
  margin-left: ${props => (props.alert ? '38.5%' : '0')};
  color: ${props => (props.alert ? 'red' : '')};
`;
