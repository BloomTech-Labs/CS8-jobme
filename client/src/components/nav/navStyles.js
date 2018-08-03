import styled from 'styled-components';
import { Link } from 'react-router-dom';

// CreditsInfo
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

  /* Makes the hamborger not so weird */
  display: flex;
  flex-direction: column;
  text-align: center;
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
  border: 1px solid black;
`;
export const NavLinkBox = styled.div``;
export const NavLink = styled(Link)`
  text-decoration: none !important;
  color: black;
  transition: color 0.3s ease;
  &:hover {
    color: rgba(55, 11, 199);;
  }
`;
export const Button = styled.button`
  margin: 10px;
  border: none;
  border-radius: 2px;
  padding-right: 10px;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: #f35d21ad;
  box-shadow: 0 0 4px #999;
  outline: none;

  &:hover {
    background: #f35d21f1 radial-gradient(circle, transparent 1%, #f35d21f1 1%)
    center/15000%;
  }
`;
