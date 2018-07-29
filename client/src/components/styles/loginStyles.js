import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;
export const ChildContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-content: center;
`;
export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  margin: 5px;
  width: ${props => (props.small ? '130px' : '175px')};
`;
export const Box = styled.input`
  margin: 5px;
`;
