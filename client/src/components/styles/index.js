import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import trash from '../../images/trash.png';
import edit from '../../images/edit.png';
import email from '../../images/email.png';
import archive from '../../images/archive.png';
import call from '../../images/call.png';

import bgImg from '../../images/landingbg.jpg';

const titleFont = '';
const textFont = '';
const buttonFont = '';

const bgColor = 'white';
// const boxColor = '#abb2e1';
const boxColor = '#d3d5f2';
const borderColor = '#3d57b1';
const titleColor = '#3a417a';
const textColor = '#1b1341';
const buttonColor = '#3a417a';
const buttonTextColor = '#1b1341';

export const BodyContainer = styled.div`
  min-width: 400px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5% 2%;
`;
export const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: ${props => (props.scroll ? 'auto' : '')}; 
  flex-direction: ${props => (props.row ? 'row' : 'column')}; 
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  border-bottom: ${props => (props.border ? `3px solid ${borderColor}` : '')};
`;
export const Form = styled.form`
  width: 100%;
  margin: 2%;
`;
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  color: rgba(24, 2, 79);
  margin-bottom: ${props => (props.signup ? '0px' : '12px')};
  margin-top: ${props => (props.separate ? '8px' : '0')};
  color: rgba(28, 4, 104);
  font-size: 16px;
`;
export const InputTitle = styled.div`
  font-size: 20px;
  color: ${titleColor};
  text-indent: 5px;
  font-family: ${titleFont};
`;
export const InputBox = styled.input`
  width: 100%;
  border: 1px solid ${borderColor};
  border-radius: 3px;
  padding: 10px;
  margin: 1px;
  height: ${props => (props.large ? '100px' : '')};
  font-family: ${textFont};
  background: ${boxColor};
`;
export const InputTextarea = styled.textarea`
  width: 100%;
  border: 1px solid ${borderColor};
  border-radius: 3px;
  padding: 10px;
  margin: 2px;
  height: ${props => (props.large ? '200px' : '40px')};
  font-family: ${textFont};
  background: ${boxColor};
`;
export const ProfilePic = styled.img`
  height: 250px;
  width: 250px;
  margin: 20px;
  border-radius: 50%;
`;
export const DropzoneContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 200px;
  margin: 20px;
`;
export const Notification = styled.div`
  color: ${props => (props.alert ? 'red' : textColor)};
  font-family: ${textFont};
`;
export const ButtonsContainer = styled.div`
  display: flex;
  padding: 1%;
  justify-content: space-around;
  margin-top: ${props => (props.browse ? '5%' : '0')};
`;
export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: ${props => (props.left ? 'flex-start' : 'center')};
  align-items: center;
  width: ${props => (props.full ? '100%' : '33.33%')};
`;
export const Button = styled.button`
  margin: 5px;
  width: ${props => (props.small ? '120px' : '')};
  width: ${props => (props.landing ? '220px' : '175px')};
  height: ${props => (props.landing ? '65px' : '')};
  font-size: ${props => (props.landing ? '32px' : '24px')};
  font-family: ${buttonFont};
  color: white;
  border-radius: 5px;
  background-color: ${buttonColor};
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  &:hover {
    color: ${buttonTextColor};
    background-color: ${props => props.color};
    cursor: pointer;
  }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
    &:hover {
      color: white;
      background-color: ${buttonColor};
    }
  }
`;
export const ModalContainer = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  height: 130px;
  align-items: center;
  z-index: 2;
`;
export const Modal = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 5px;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${textColor};
`;
export const Link = styled(RouterLink)`
  &:hover {
    text-decoration: none;
  }
`;

// **********
// CARD GRID
// **********

export const GridContainer = BodyContainer.extend`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 290px;
  border: 3px solid ${borderColor};
  border-radius: 5%;
  margin: 1% 0;
  padding: 1%;
  background: ${boxColor};
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;
export const CardPic = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;
export const CardName = styled.div`
  width: 100%;
  font-size: 24px;
  color: ${titleColor};
  margin: 0 1%;
  margin:${props => (props.jobs ? '5% 1%' : '0 1%')};
  text-align: center;
  font-size: 24px;
`;
export const CardTitle = styled.div`
  width: 100%;
  font-size: 20px;
  color: ${titleColor};
  margin: 5% 0;
  text-align: center;
  font-size: 20px;
`;
export const CardParagraph = styled.div`
  font-size: 14px;
  color: ${textColor};
  padding: 0 5%;
  padding-bottom: 4%;
  height: 45%;
  overflow: auto;
`;
export const CardButton = Button.extend`
  background-image: ${props => (props.trash ? `url(${trash})` : '')};
  background-image: ${props => (props.edit ? `url(${edit})` : '')};
  background-image: ${props => (props.call ? `url(${trash})` : '')};
  background-image: ${props => (props.email ? `url(${email})` : '')};
  background-image: ${props => (props.archive ? `url(${archive})` : '')};
  background-image: ${props => (props.call ? `url(${call})` : '')};
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${buttonColor};
  background-size:${props => (props.email ? '40px 40px' : '30px 30px')};
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

// **************
// BROWSE STYLES
// **************

export const NoneLeftMessage = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: ${textColor};
`;

export const BrowseView = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  padding: 5%;
  border: 3px solid ${borderColor};
  border-radius: 10px;
  background: ${boxColor};
  overflow: auto;
`;
export const Title = styled.div`
  font-size: ${props => (props.big ? '32px' : '24px')};
  display: flex;
  width: 100%;
  padding: 2% 0;
  padding-left: ${props => (props.center ? '' : '4%')};
  border-top: ${props => (props.borderTop ? `3px solid ${borderColor}` : '')};
  border-bottom: ${props => (props.borderBottom ? `3px solid ${borderColor}` : '')};
  color: ${titleColor};
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;
export const MatchedAndDesired = Title.extend`
  font-size: 18px;
  color: ${titleColor};
  color: black;
`;
export const Paragraph = Title.extend`
  text-align: ${props => (props.center ? 'center' : 'flex-start')};
  font-size: ${props => (props.big ? '24px' : '16px')};
  color: ${textColor};
  margin: 0;
  padding 0;
`;
export const DropDownArrow = styled.p`
  cursor: pointer;
  margin: 0;
  font-size: 3em;
  line-height: .85;
  &:hover {
    text-shadow: 2px 2px 10px white;
  }

 
 
`;

// ***************
// LANDING STYLES
// ***************
export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const EmptyFlex = styled.span`flex: 1`;
export const LandingDesktopLogoWrapper = styled.div`
  flex: 1;
  height: 100%;
`;
export const LandingMobileLogoWrapper = styled.label`
  text-align: center;
  width: 100%;
`;
export const LandingDesktopLogo = styled.label`
  height: 100%;
  padding: 0 1rem;
  font-size: 10vw;
  align-items: center;
  display: flex;
  margin: 0;
  font-family: 'Cardo', serif;
  color: rgba(255, 255, 255, 0.5);
`;

export const LandingFormContainer = styled.section`
  background: rgba(0,0,0,0.5);
  opacity: 0.75;
  width: 30%;
  height: 100%;
  min-height: 535px;
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-width: calc(300px + 2rem);
  max-height: 100%;
  overflow-y: auto;
  transition: height 1s;
  text-align: center;
`;
export const LandingFormHeader = styled.header`
  border-bottom: 2px solid black; 
  width: 100%;
  display: flex;
`;
export const LandingFormHeaderTitle = styled.div`
  background:rgb(2, 2, 108);
  color: white;
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: calc(0.9rem + 0.1vw);
  font-weight: 700; 
  text-align: center;
  border-radius: 0.5rem 0.5rem 0 0;
`;
export const LandingFormHeaderButton = styled.button`
  border-top-left-radius: 0.5rem; 
  border-top-right-radius: 0.5rem; 
  border: 1px solid black;
  border-bottom: none;
  outline: none; 
  padding: 0.2rem 0;
  color: white; 
  cursor: pointer;
  font-size: calc(1rem + 0.75vw);
  transition: background-color 0.75s;
  flex: 1;
`;

export const LandingFormsWrapper = styled.section`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 0 0 0.5rem 0.5rem;
  overflow-y: auto;  
  overflow-x: hidden;  
  font-size: calc(0.5rem + 0.75vw);
`;
export const LandingForm = styled.form`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items : center;
  overflow: auto;
`;

export const LandingFormLabel = styled.label``;
export const LandingSectionUser = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const LandingSectionInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
export const LandingSectionCredentials = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: row;
`;
export const LandingSectionLogin = styled.section`
  display: flex;
  justify-content: center;  
  flex-direction: column;
  width: 100%;
`;
export const LandingInput = styled.input`
  margin: 0.25rem;
  padding: 0.5rem;
`;
export const LandingInput100 = LandingInput.extend`
  width: calc(100% - 0.5rem);
`;
export const LandingInput50 = LandingInput.extend`
  width: calc(50% - 0.5rem);
`;
export const LandingInput100C = LandingInput100.extend`
  text-align: center;
`;
export const LandingTextarea = styled.textarea`
  width: calc(100% - 0.5rem);
  padding: 0.5rem;
  min-height: 3rem;
  resize: none;
`;
export const LandingSubmitButton = styled.input`
  width: calc(100% - 0.5rem);
  margin: 0.25rem;
  background: blue;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.45s;
  padding: 1rem 0;
`;
export const LandingToggle = styled.span`
  text-align: center;
  padding-bottom: 1rem;
`;
export const LandingToggleButton = styled.button`
  border: none;
  background: none;
  color: blue;
  outline: none;
  cursor: pointer;
`;
export const LandingLogo = styled.img`
  width: 80%;
`;
export const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  min-height: 100%;
  top:0;
  right:0;
  bottom:0;
  left:0;
  position: absolute;
  &::after {
    content: "";
    background: url(${bgImg}) no-repeat center center fixed;
    opacity: .7;
    top:0;
    right:0;
    bottom:0;
    left:0;
    position: fixed;
    z-index: -1;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;


// LOADING
export const Loading = styled.div`
    display:flex;
    justify-content:center;
    margin-top: 20%;
`;

// *********
// NAV INFO
// *********

export const CreditsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  border-bottom: 2px ridge ${borderColor};
`;
export const TextBox = styled.div`
  font-size: 24px;
  color: ${titleColor};
  padding-right: 25px;
`;

// *********
// NAV
// *********

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
  color: ${borderColor};
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
  background-color: ${boxColor};
  border: 2px groove ${borderColor};
  border-radius: 5px;
`;
export const NavLinkBox = styled.div`
  width: 100%;
  background-color: ${props => (props.selected ? titleColor : '')};
  color: ${props => (props.selected ? 'white' : titleColor)};
  border: ${props => (props.selected ? `0 2px solid ${borderColor}` : '')};
  &:hover {
    color: white;
    background-color: ${props => (props.selected ? titleColor : borderColor)}; 
  }
`;
export const NavLink = styled(Link)`
  text-decoration: none !important;
  color: ${titleColor};
  transition: color 0.3s ease;
  &:hover {
    color: ${titleColor};
    text-decoration: underline;
  }
`;
export const NavButton = styled.button`
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

//  *********
// PROFILE
// **********

export const SecurityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 20%;
  padding-top: 5%;
`;
export const ConfirmCheck = styled.input`
  margin-right: 10px;
  color: ${textColor};
  font-size: 16px;
  box-shadow: 1px 1px 1px rgba(28, 4, 104, .5);
`;

// ********
// APP
// ********

export const Container = styled.div`
  min-width: 300px;
  height: 100%;
  width: 100%; 
  display: flex;
  justify-content: center;
  padding: 1rem auto;
  background: ${bgColor};
`;
export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 180px;
`;

// **********
// Messenger
// **********

export const MessengerContainer = BrowseView.extend`
  flex-direction: row; 
  padding: 0; 
  max-height: 80vh; 
`;
export const SideBarContainer = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  border-right: 3px solid ${borderColor};
`;
export const SideBarBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 20px;
  background-color: ${props => (props.selected ? titleColor : '')};
  color: ${props => (props.selected ? 'white' : titleColor)};
  border: ${props => (props.selected ? `0 2px solid ${borderColor}` : '')};
  &:hover {
  color: white;
  background-color: ${props => (props.selected ? titleColor : borderColor)}; 
  }
  
`;
export const SideBarName = styled.div`

`;
export const SideBarTitle = styled.div`
  font-size: 16px;
`;
export const HistoryContainer = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  bottom: 0;
  margin: 1%;
  overflow: auto;
  
`;
export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 3%;
  padding-left: 1%;
  padding-bottom: 4%;
  flex-direction: column;
  justify-content: space-between;
`;
export const MessageSender = styled.div`
  display: flex;
  flex-direction: column; 
  font-size: 20px;
  color: ${titleColor};
`;
export const Message = styled.div`
  width: 100%;
  display: flex;
  padding: 1%;
  color: ${textColor};
  flex-direction: column;
  background-color: ${props => props.color}; 
  border: 1px solid ${borderColor};
  border-radius: 3px;
`;
export const MessageTime = styled.div`
  font-size: 12px;
  padding-left: 1%;
  color: ${textColor};
  display: flex; 
`;
