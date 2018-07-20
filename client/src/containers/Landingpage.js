import React from 'react';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

const LandingPage = () => {
  return (
    <div>
      <header style={{ align: 'right' }}>
        <a href="/signup" class="nav_link">Sign up</a>
        <a href="/login" class="nav_link">Sign in</a>
      </header>
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
          <img src='images/fry.jpeg' alt='img1' data-action="" />
          <img src='images/img2.png' alt='img2' data-action="" />
          <img src='images/img3.png' alt='img3' data-action="" />
          <img src='../images/img4.png' alt='img4' data-action="" />
          <img src='images/img5.png' alt='img5' data-action="" />
          <img src='images/img6.png' alt='img6' data-action="" />
          <img src='images/img7.png' alt='img7' data-action="" />
        </Coverflow>
      </StyleRoot>

    </div>
  );
};



export default LandingPage;
