import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    CreditsContainer,
    TextBox,
  } from '../styles/navBarInfoStyles';

class SeekerCreditsInfo extends Component {



render() {
    return (
      <CreditsContainer>
        <TextBox>
          Free Apps: {this.props.appsAvailable}
        </TextBox>
        <TextBox>
          Balance: {this.props.credits} Credits
        </TextBox>
      </CreditsContainer>
        );
    }
  };

  const mapStateToProps = state => {
    const { appsAvailable, credits } = state.loggedInSeeker.profile
    return ({ appsAvailable, credits });
  }

  export default  connect(mapStateToProps)(SeekerCreditsInfo);
  