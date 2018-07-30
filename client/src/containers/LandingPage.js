import React from 'react';
import img from '../images/hand.jpeg';
import { LandingLogin, LandingRegister } from '../components';


import './tempcss/landing.css';

const LandingPage = () => <div className="bkg_img">
      <img src={img} alt="Find your job" className="img1" />
      <div className="bro_bigtext">
        <h1>Job Me Bro!</h1>
      </div>
      <div className="bro_signup_cont">
        <div className="bro_signup">
          <p> Sign Up Today! </p>
          <LandingRegister/>
          <p> Already have an account?</p>
          <LandingLogin/>
        </div>
      </div>
    </div>;


export default LandingPage;
