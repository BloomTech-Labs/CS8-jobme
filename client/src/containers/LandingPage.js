import React from 'react';
import { LandingLogin, LandingRegister } from '../components';
import {LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
  RegisterTitle,
  LoginTitle,
  RegisterAndLoginContainer,
  TitleBox,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>jober</AppTitle>
    <RegisterAndLoginContainer center>
      <LoginOrRegister/>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

export default LandingPage;
