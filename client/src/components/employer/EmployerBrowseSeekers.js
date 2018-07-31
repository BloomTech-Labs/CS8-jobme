import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers } from '../../actions';
import EmployerBrowseView from './EmployerBrowseView';
import { BodyContainer, NoneLeftMessage } from '../styles';

class EmployerBrowseSeekers extends Component {
  render() {
    return (
      <BodyContainer>
        {this.props.seekers.outOfSeekers
          ? <NoneLeftMessage>
            Looks like there is no one left to hire :[
          </NoneLeftMessage>
          : <EmployerBrowseView jobSeeker={this.props.jobSeekers[0]} />
        }
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobSeekers: state.seekers.availableSeekers,
  };
};

export default connect(
  mapStateToProps,
  { getSeekers },
)(EmployerBrowseSeekers);
