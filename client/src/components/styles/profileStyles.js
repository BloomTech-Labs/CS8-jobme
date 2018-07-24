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
  width: 100%;
`;
export const ChildTitles = ChildContainer.extend`
  width: 300px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
`;
export const NamelessContainer = ChildContainer.extend`
  justify-content: space-between;
`;
export const ChildBoxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
export const Img = styled.img`
`;
// TODO: Wasting too much time on this but can't figure out why
// TopTitle length is 218px when set to 300px.
export const SecurityContainer = ChildContainer.extend`
  flex-direction: column;
  width: 70%;
  margin-left: 20%;
`;
export const ConfirmCheck = styled.div`
  font-size: 16px;
`;
export const ButtonContainer = ChildContainer.extend`
  justify-content: center;
`;
export const SaveButton = styled.button`
  width: 200px;
`;
