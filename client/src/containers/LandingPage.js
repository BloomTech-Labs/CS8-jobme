import React from 'react';
import { LandingLogin, LandingRegister } from '../components';

// import './tempcss/landing.css';
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
    <AppTitle><TitleBox>jober</TitleBox></AppTitle>
    <RegisterAndLoginContainer center>
      <LoginTitle>Login to find your match!</LoginTitle>
      <LandingLogin/>
      <RegisterTitle>Need an account?</RegisterTitle>
      <LandingRegister/>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

export default LandingPage;
