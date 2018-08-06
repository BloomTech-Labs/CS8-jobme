import styled from 'styled-components';
import { Link } from 'react-router-dom';

// CreditsInfo
// Nav
export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 165px;
  align-items: flex-end;
  margin: .6% 18px;
`;
// ^^^ width important here for page to be centered, if
// changed, margin-left must be changed in App,ContentContainer
export const Hamburger = styled.div`
  font-size: 3em;
  z-index: 1;
  width: 50px;
  height: 50px;
  transform: rotate(${props => (props.open ? '90deg' : '0deg')});
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  &:hover {
    text-shadow: 1px 1px 2px black;
  }
`;
export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 24px;
  margin-top: 13%;
  width: 170px;
  padding-top: 15%;
  padding-bottom: 17%;
  opacity: ${props => (props.open ? '1' : '0')};
  z-index: ${props => (props.open ? '0' : '-1')};
  transition: all 0.7s ease-in-out;
  background-color: rgb(245,245,245);
  border: 2px groove black;
  border-radius: 5px;
`;
export const NavLinkBox = styled.div`
  width: 100%;
  background-color: ${props => (props.selected ? 'rgb(200,200,200)' : '')};
  border: ${props => (props.selected ? '1px solid black' : '')};
  border-radius: 3px;
  &:hover {
   background-color: rgb(200,200,200); 
  }
`;
export const NavLink = styled(Link)`
  text-decoration: none !important;
  color: black;
  transition: color 0.3s ease;
  &:hover {
    color: rgba(55, 11, 199);;
  }
`;
export const Button = styled.button`
  border: none;
  margin: 0 30px;
  border-radius: 3px;
  text-align: center;
  font-size: 18px;
  margin-top: 15%;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
  background-color: #f35d21ad;
  box-shadow: 0 0 4px #999;
  outline: none;
  &:hover {
    background: #f35d21f1 radial-gradient(circle, transparent 1%, #f35d21f1 1%)
    center/15000%;
  }
`;
