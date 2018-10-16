import React from 'react';

import {LandingStart, LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    {/* <span style={{flex:1}}/>
    {(window.innerHeight * 100 / (window.innerHeight + window.innerWidth)) <= 62 && <AppTitle>Rcruit</AppTitle>}
    <LoginOrRegister/> 
    <span style={{flex:1, minWidth: '30%'}}/> */}
    <LandingStart/>
  </BackgroundContainer>
);

export default LandingPage;
