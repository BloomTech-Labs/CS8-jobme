import React from 'react';

const NavConst = props => {
  return (
    <div class="navCont">
      <div class="navDiv right_nav">
        <h2> Postings Available: {props.postsAva} </h2>
        <h2> Free Calls: {props.freeCall} </h2>
        <h2> Balance: {props.credits} Credits </h2>
      </div>
    </div>
  );
};

export default NavConst;
