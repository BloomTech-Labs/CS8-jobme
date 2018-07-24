import React from 'react';

import img from '../images/hand.jpeg';

import './tempcss/landing.css'

const LandingPage = () => {
  return (
    <div class="bkg_img">
      <img src={img} class="img1"/>
      <div class="bro_bigtext">
        <h1> Job Me Bro! </h1>
      </div>
      <div class="bro_signup_cont">
        <div class="bro_signup">
          <h1> Sign Up Today! </h1>
          <a href="/signup">
          <button class="ripple"> I'm a Seeker </button>
          </a>
          <a href="/signup">
          <button class="ripple"> I'm a Recruiter </button>
          </a>
          <p> Already have an account?</p>
          <button class="ripple"> Log-In </button>
        </div>
      </div>
    </div>
  );
};



export default LandingPage;
