import styled from 'styled-components';

export const BrowseContainer = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
`;
export const NoJobsMessage = styled.div`
  font-size: 24px;
`;
export const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const TopContainer = JobCard.extend`
  flex-direction: row;
`;
export const Img = styled.img`
  
`;
export const NameAndBio = JobCard.extend`
  
`;
export const Title = TopContainer.extend`
  font-size: 24px;
`;
export const Paragraph = TopContainer.extend`
  font-size: 14px;
`;
export const Buttons = TopContainer.extend`
  justify-content: space-between;
`;
export const Button = styled.button`
  width: 100px;
`;
export const Collapser = TopContainer.extend`
  height: 100px;
  color: green;
`;
