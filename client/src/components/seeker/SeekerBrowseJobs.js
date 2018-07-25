import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getJobs } from '../../actions';

class SeekerBrowseJobs extends Component {
  state = {
    index: 0,
  }
  componentDidMount() {
    const token = localStorage.getItem('seekerToken');
    this.props.getJobs(token);
  }
  render() {
    return <div>{this.props.jobs.outOfJobs ? <h1>Looks like your out of jobs pall</h1> : }</div>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  { getJobs }
)(SeekerBrowseJobs);


