import React from 'react';
import { Link } from 'react-router-dom';

import img from '../images/hand.jpeg';
import { LandingLogin } from '../components';


import './tempcss/landing.css'

const LandingPage = () => {
  return <div className="bkg_img">
      <img src={img} alt="Find your job" className="img1" />
      <div className="bro_bigtext">
        <h1>Job Me Bro!</h1>
      </div>
      <div className="bro_signup_cont">
        <div className="bro_signup">
          <h1> Sign Up Today! </h1>
          <Link to={{ pathname: '/signup', state: { seekerRegister: true }}}>
            <button className="ripple"> I'm a Seeker </button>
          </Link>
          <Link to={{ pathname: '/signup', state: { seekerRegister: false }}}>
            <button className="ripple"> I'm a Recruiter </button>
          </Link>
          <p> Already have an account?</p>
          <LandingLogin/>
        </div>
      </div>
    </div>;
};



export default LandingPage;
