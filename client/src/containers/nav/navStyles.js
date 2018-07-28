import styled from 'styled-components';
import { Link } from 'react-router-dom';

// CreditsInfo
export const CreditsContainer = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;
export const TextBox = styled.div`
  font-size: 20px;
  padding-right: 20px;
`;

// Nav
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 165px;
  justify-content: flex-right;
`;
// ^^^ width important here for page to be centered, if
// changed, margin-left must be changed in App,ContentContainer
export const Hamburger = styled.div`
  font-size: 32px;
  z-index: 1;
  width: 50px;
  height: 50px;
  margin-left: 115px;
  transform: rotate(${props => (props.open ? '90deg' : '0deg')});
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
`;
export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  padding-left: 10px;
  opacity: ${props => (props.open ? '1' : '0')};
  z-index: ${props => (props.open ? '0' : '-1')};
  transition: all 0.7s ease-in-out;
  background-color: lightgray;
`;
export const NavLinkBox = styled.div``;
export const NavLink = styled(Link)`
  text-decoration: none !important;
  color: black;
  transition: color 0.3s ease;
  &:hover {
    color: red;
  }
`;
export const Button = styled.button`
  margin: 10px;
`;
