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

// pass index as props to display card
// increment index on like/dislike
// if index is larger than length, set out of jobs to false

const mapStateToProps = (state) => {
  return {
    availableJobs: state.jobs.availableJobs,
  }
};

export default connect(
  mapStateToProps,
  { getJobs },
)(SeekerBrowseJobs);
