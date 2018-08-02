import React from 'react';
import { LandingLogin, LandingRegister } from '../components';

// import './tempcss/landing.css';
import {
  BackgroundContainer,
  AppTitle,
  RegisterTitle,
  LoginTitle,
  RegisterAndLoginContainer,
} from '../components/styles';

const LandingPage = () => (
  <BackgroundContainer>
    <AppTitle>Job<br/>Me<br/>Bro!</AppTitle>
    <RegisterAndLoginContainer center>
      <LoginTitle>Login to find you match!</LoginTitle>
      <LandingLogin/>
      <RegisterTitle>Need an account?</RegisterTitle>
      <LandingRegister/>
    </RegisterAndLoginContainer>
  </BackgroundContainer>
);

export default LandingPage;
