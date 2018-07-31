import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    CreditsContainer,
    TextBox,
  } from '../styles/navBarInfoStyles';

class EmployerNavBarInfo extends Component {
render() {
    return (
      <CreditsContainer>
        <TextBox>
          Postings Available: {this.props.postsAvailable}
        </TextBox>
        <TextBox>
          Free Calls: {this.props.callsAvailable}
        </TextBox>
        <TextBox>
          Balance: {this.props.credits} Credits
        </TextBox>
      </CreditsContainer>
        );
    };
  }

const mapStateToProps = state => {
  const { postsAvailable, credits, callsAvailable } = state.user.profile
  return ({ postsAvailable, credits, callsAvailable });
};

export default connect(mapStateToProps)(EmployerNavBarInfo);