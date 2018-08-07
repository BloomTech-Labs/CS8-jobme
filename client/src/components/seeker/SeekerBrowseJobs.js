import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeekerBrowseView from './SeekerBrowseView';
import { getJobs } from '../../actions';
import { BodyContainer, NoneLeftMessage } from '../styles';

class SeekerBrowseJobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    return (
      <BodyContainer>
        {!this.props.availableJobs.length
          ? <NoneLeftMessage>
            Looks like your out of jobs pal :[
          </NoneLeftMessage>
          : <SeekerBrowseView job={this.props.availableJobs[0]}/>
        }
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { getJobs },
)(SeekerBrowseJobs);
