  import React from 'react';
  import Coverflow from 'react-coverflow';
  import { StyleRoot } from 'radium';

  import img from '../images/img4.png';

  import './tempcss/landing.css'

  const LandingPage = () => {
    return (
      <div class="bkg_img">
        <div class="land_header">
          <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="/signup" class="nav_link">Sign up</a>
            <a href="/login" class="nav_link">Sign in</a>
          </header>
        </div>
        <StyleRoot>
          <Coverflow
            displayQuantityOfSide={1}
            // navigation
            infiniteScroll
            // enableHeading
            clickable
            media={{
              '@media (max-width: 900px)': {
                width: '600px',
                height: '300px'
              },
              '@media (min-width: 900px)': {
                width: '960px',
                height: '600px'
              }
            }}
          >
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
            <img src={img} alt='' data-action="" />
          </Coverflow>
        </StyleRoot>
        <div class="landing_text">
          <h1> JOB ME BRO </h1>
          <h4> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </h4>
        </div>

      </div>
    );
  };



  export default LandingPage;
