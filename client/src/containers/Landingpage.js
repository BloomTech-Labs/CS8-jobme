import React from 'react';

import img from '../images/hand.jpeg';
import img2 from '../images/itworks.png';

import './tempcss/landing.css'

const LandingPage = () => {
  return (
    <div class="bkg_img">
      <img src={img} />
      <div class="bro_bigtext">
        <h1> Job Me Bro! </h1>
        <h4> Our Proven System WORKS!!! </h4>
        <img src={img2} class="img2" />
      </div>
      <div class="bro_signup_cont">
        <div class="bro_signup">
          <h1> Sign Up Today! </h1>
          <button class="ripple"> I'm a Seeker </button>
          <button class="ripple"> I'm a Recruiter </button>
          <p> Already have an account?</p>
          <button class="ripple"> Log-In </button>
        </div>
      </div>
    </div>
  );
};



export default LandingPage;
