import styled from 'styled-components';

// CreditsInfo
export const CreditsContainer = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
`;
export const TextBox = styled.div`
  font-size: 20px;
  padding-right: 20px;
`;

// Nav
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;
// .cont, navContainer, h4
export const Hamburger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  display: flex;
  justify-content: flex-right;
  z-index: 1;
  transform: rotate(${props => (props.open ? '90deg' : '0deg')});
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
`;
// nav_collapse || nav_collapse_open
export const NavLinks = styled.div`
display: flex;
flex-direction: column;
font-size: 24px;
opacity: ${props => (props.open ? '1' : '0')};
z-index: ${props => (props.open ? '0' : '-1')};
transition: all 0.7s ease-in-out;
`;
export const NavLinkBox = styled.div`
  
`;
export const NavLink = styled.a`
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;
  &:hover { color: red; }
`;
