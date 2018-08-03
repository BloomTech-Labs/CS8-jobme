import React from 'react';
import { LandingLogin, LandingRegister } from '../components';
import {LoginOrRegister } from '../components';

import {
  BackgroundContainer,
  AppTitle,
  RegisterTitle,
  LoginTitle,
  RegisterAndLoginContainer,
  RegisterAndLoginChild,
  TitleBox,
  ChildContainer,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>jober</AppTitle>
    <RegisterAndLoginContainer>
      <RegisterAndLoginChild>
        <LoginOrRegister/>
      </RegisterAndLoginChild>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

export default LandingPage;
