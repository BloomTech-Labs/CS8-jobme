import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers } from '../../actions';
import EmployerBrowseView from './EmployerBrowseView';
import { BodyContainer, NoneLeftMessage } from '../styles';

class EmployerBrowseSeekers extends Component {
  componentDidMount() {
    this.props.getSeekers();
  }
  
  render() {
    return (
      <BodyContainer>
        {this.props.availableSeekers.length
          ? <NoneLeftMessage>
            Looks like there is no one left to hire :[
          </NoneLeftMessage>
          : <EmployerBrowseView jobSeeker={this.props.availableSeekers[0]} />
        }
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    availableSeekers: state.seekers.availableSeekers,
  };
};

export default connect(
  mapStateToProps,
  { getSeekers },
)(EmployerBrowseSeekers);
