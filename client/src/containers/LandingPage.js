import React from 'react';

import { LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
  RegisterAndLoginContainer,
  RegisterAndLoginChild,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>rcruit</AppTitle>
    <RegisterAndLoginContainer>
      <RegisterAndLoginChild>
        <LoginOrRegister/>
      </RegisterAndLoginChild>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

export default LandingPage;
