import styled from 'styled-components';
// import { runInThisContext } from 'vm';

export const StyledProfile = styled.div`
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
export const UserInfoAndPic = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
export const Entry = ChildContainer.extend`
  flex-direction: row;
  justify-content: space-around;
`;
export const ChildTitle = ChildContainer.extend`
  width: ${props => (props.upper ? '328px' : '300px')};
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
`;
export const ChildBox = styled.input`
  width: 100%;
  height: ${props => (props.large ? '100px' : '')};
`;
export const ChildTextArea = styled.textarea`
  width: 100%;
  height: 200px;
`;
export const Img = styled.img`
`;
export const SecurityContainer = ChildContainer.extend`
  flex-direction: column;
  width: 70%;
  margin-left: 20%;
`;
export const ConfirmCheck = styled.input`
  font-size: 16px;
`;
export const SaveButton = styled.button`
  width: 200px;
  margin-left: 20%;
`;
