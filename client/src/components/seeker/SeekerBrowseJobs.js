import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeekerBrowseJobCard from './SeekerBrowseJobCard';
import { getJobs, toggleJobAvailability } from '../../actions';

class SeekerBrowseJobs extends Component {
  state = {
    index: 0,
  }
  componentDidMount() {
    const token = localStorage.getItem('seekerToken');
    this.props.getJobs(token);
  }

  incrementIndex() {
    // const token = localStorage.getItem('seekerToken');
    let index = this.state.index;
    index++
    if (index >
      this.props.jobs.availableJobs.length - 1) {
      // this.props.getJobs(token);
      // eventually you'll reget jobs after they are filtered
      // on the backend for now use below line
      this.props.toggleJobAvailability()
    } else {
    this.setState({ index })
    }
  }
  render() {
    return (<div>{this.props.jobs.outOfJobs ? <h1>Looks like your out of jobs pal</h1> : <SeekerBrowseJobCard index={this.state.index} increment={this.incrementIndex.bind(this)} />}</div>);
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


