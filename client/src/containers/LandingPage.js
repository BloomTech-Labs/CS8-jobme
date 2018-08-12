import React from 'react';

import { LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>Rcruit</AppTitle>
    <LoginOrRegister/>
  </BackgroundContainer>
);

export default LandingPage;
