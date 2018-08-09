import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers } from '../../actions';

import EmployerBrowseView from './EmployerBrowseView';
import Progress from '../../containers/Progress';

import {
  BodyContainer, 
  NoneLeftMessage,
 } from '../styles';

class EmployerBrowseSeekers extends Component {
  componentDidUpdate() {
    if (!this.props.availableSeekers.length 
      && !this.props.getSeekerFailed) {
      this.props.getSeekers();
    }
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    if (this.props.availableSeekers && this.props.availableSeekers.length) {
      return (
        <BodyContainer>
          <EmployerBrowseView />
        </BodyContainer>
      );
    }
    return (
      <BodyContainer>
          <NoneLeftMessage>
            Looks like there is no one left to hire :[
        </NoneLeftMessage>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.seekers.job,
    availableSeekers: state.seekers.availableSeekers,
    inProgress: state.seekers.inProgress,
    getSeekerFailed: state.seekers.getSeekerFailed,
  };
};

export default connect(
  mapStateToProps,
  { getSeekers },
)(EmployerBrowseSeekers);
