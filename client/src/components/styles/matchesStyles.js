import styled from 'styled-components';

export const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  justify-content: space-around;
`;
export const Card = styled.div`
  width: 300px;
  border: 2px solid black;
  margin: 1% 0;
  padding-bottom: 15px;
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Picture = styled.img`

`;
export const Name = styled.div`
  font-size: 24px;
  font-color: black;
  text-indent: 20px;
`;
export const Title = styled.div`
  font-size: 20px;
  font-color: black;
  padding: 10px 0;
  padding-left: 20px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Button = styled.button`
  font-size: 22px;
  font-color: black;
  width: 120px;
`;
