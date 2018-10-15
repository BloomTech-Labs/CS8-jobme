import React from 'react';

import {LandingStart, LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>Rcruit</AppTitle>
    {/* <LoginOrRegister/> */}
    <LandingStart/>
  </BackgroundContainer>
);

export default LandingPage;
