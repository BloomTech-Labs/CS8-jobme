import React from 'react';
import { Link } from 'react-router-dom';

import img from '../images/hand.jpeg';
import { LandingLogin } from '../components';

import './tempcss/landing.css'

const LandingPage = () => {
  return <div class="bkg_img">
      <img src={img} alt="Find your job" class="img1" />
      <div class="bro_bigtext">
        <h1> Job Me Bro! </h1>
      </div>
      <div class="bro_signup_cont">
        <div class="bro_signup">
          <h1> Sign Up Today! </h1>
          <Link to={{ pathname: '/signup', state: { seekerRegister: true } }}>
            <button class="ripple"> I'm a Seeker </button>
          </Link>
          <Link to={{ pathname: '/signup', state: { seekerRegister: false } }}>
            <button class="ripple"> I'm a Recruiter </button>
          </Link>
          <p> Already have an account?</p>
          <LandingLogin/>
        </div>
      </div>
    </div>;
};



export default LandingPage;
