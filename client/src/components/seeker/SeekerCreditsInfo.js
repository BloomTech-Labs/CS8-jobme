import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    CreditsContainer,
    TextBox,
  } from '../styles';

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

const mapStateToProps = (state) => {
  const { appsAvailable, credits } = state.user.profile
  return ({ appsAvailable, credits });
}

export default connect(mapStateToProps)(SeekerCreditsInfo);