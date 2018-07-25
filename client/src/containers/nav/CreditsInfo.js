import React, { Component } from 'react';
import {
  CreditsContainer,
  TextBox,
} from './navStyles';

class CreditsInfo extends Component {
  state = {
    name: 'Kevin',
    postingsAvailable: 2,
    freeCalls: 3,
    credits: 230,
  };

  render() {
  return (
    <CreditsContainer>
      <TextBox>
        Postings Available: {this.state.postingsAvailable}
      </TextBox>
      <TextBox>
        Free Calls: {this.state.freeCalls}
      </TextBox>
      <TextBox>
        Balance: {this.state.credits} Credits
      </TextBox>
    </CreditsContainer>
  );
}
};

export default CreditsInfo;
