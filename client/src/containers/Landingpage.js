import React from 'react';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

import img from '../images/img4.png';

import './tempcss/landing.css'

const LandingPage = () => {
  return (
    <div>
      <div class="land_header">
        <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/signup" class="nav_link">Sign up</a>
          <a href="/login" class="nav_link">Sign in</a>
        </header>
      </div>
      <StyleRoot>
        <Coverflow
          displayQuantityOfSide={3}
          navigation
          infiniteScroll
          enableHeading
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

    </div>
  );
};



export default LandingPage;
