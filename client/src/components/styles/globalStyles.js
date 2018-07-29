import styled from 'styled-components';

export const BodyContainer = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const InputContainer = ChildContainer.extend`
  flex-direction: row;
  justify-content: space-around;
`;
export const InputTitle = ChildContainer.extend`
  width: ${props => (props.upper ? '345px' : '300px')};
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
`;
export const InputBox = styled.input`
  width: 100%;
  height: ${props => (props.large ? '100px' : '')};
`;
export const InputTextarea = styled.textarea`
  width: 100%;
  height: 200px;
`;
export const Img = styled.img`
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Button = styled.button`
  margin: 5px;
  width: ${props => (props.small ? '130px' : '175px')};
`;
