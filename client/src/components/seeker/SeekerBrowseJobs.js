import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeekerBrowseJobCard from './SeekerBrowseJobCard';
import { getJobs, toggleJobAvailability } from '../../actions';

import { BrowseContainer, NoJobsMessage } from '../styles/browseStyles'; 

class SeekerBrowseJobs extends Component {
  state = {
    index: 0,
  }
  componentDidMount() {
    const token = localStorage.getItem('seekerToken');
    this.props.getJobs(token);
  }

  incrementIndex() {
    let { index } = this.state;
    let { availableJobs } = this.props.jobs;

    // const token = localStorage.getItem('seekerToken');	
    index++;
    if (index >
      availableJobs.length - 1) {
      // this.props.getJobs(token);
      // eventually you'll reget jobs after they are filtered
      // on the backend for now use below line
      this.props.toggleJobAvailability()
    } else {
    this.setState({ index })
    }
  }

  render() {
    return (
      <BrowseContainer>
        {this.props.jobs.outOfJobs ? 
          <NoJobsMessage>
            Looks like your out of jobs pal :[
          </NoJobsMessage>
        : 
        <SeekerBrowseJobCard 
          index={this.state.index} 
          increment={this.incrementIndex.bind(this)} 
        />
        }
      </BrowseContainer>
    );
  }
}

//pass index as props to display card
//increment index on like/dislike
//if index is larger than length, set out of jobs to false

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  { getJobs, toggleJobAvailability }
)(SeekerBrowseJobs);
