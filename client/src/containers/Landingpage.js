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
          <a href="/jobseekersignup">
          <button class="ripple"> I'm a Seeker </button>
          </a>
          <a href="/employersignup">
          <button class="ripple"> I'm a Recruiter </button>
          </a>
          <p> Already have an account?</p>
          <a href="/login">
          <button class="ripple"> Log-In </button>
          </a>
        </div>
      </div>
    </div>
  );
};



export default LandingPage;
