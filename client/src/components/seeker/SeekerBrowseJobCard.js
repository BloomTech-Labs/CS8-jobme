import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SeekerBrowseJobCard extends Component {
  likeAndIncrement() {
    const token = localStorage.getItem('seekerToken')
    console.log('token', token);
    const requestOptions = { headers: 
      { Authorization: `Bearer ${token}` }
    } 
    const id = this.props.jobs.availableJobs[this.props.index]._id;
    axios.put(`jobs/like/${id}`, {}, requestOptions).then(response => {
      return this.props.increment();
    });
  }
  render() {
    const { availableJobs } = this.props.jobs;
    return (
      <div>
        <h1>{availableJobs[this.props.index].company}</h1>
        <h1>{availableJobs[this.props.index].titleAndSalary}</h1>
        <h1>{availableJobs[this.props.index].description}</h1>
        <button onClick={() => this.likeAndIncrement()}>Like</button>
      </div>
    );
  }
}

// click should like the job and then increase index
// index should be checked for render or stop

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(SeekerBrowseJobCard);

// You login and you go to browse
// You send the token and do a GET for jobs
// You have one job that you can like/pass(super like in Balsamiq but treat as stretch?)
// Then you should get another job
// Repeat until no jobs available

/*### Like a Job
  - [PUT] request to`/jobs/like/:jobId` requires a signed JWT retrieved from successful[POST] to / seekers / login. 
- Nothing is needed in the body. 
- Response body contains a boolean value for `match`, indicating whether the seeker has already been liked for the job.
*/