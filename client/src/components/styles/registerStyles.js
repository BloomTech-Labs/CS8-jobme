import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  Entry,
  ChildTitle,
  ChildBox,
  Button,
} from './profileStyles';

export const StyledRegister = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Banner = styled.div`
  font-size: 30px;
`;
export const Message = styled.div`
  margin-left: ${props => (props.alert ? '38.5%' : '0')};
  color: ${props => (props.alert ? 'red' : '')};
`;
export const Link = styled(RouterLink)`
  
`;
export {
  Entry,
  ChildTitle,
  ChildBox,
  Button,
};
