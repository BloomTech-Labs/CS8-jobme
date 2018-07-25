import React, { Component } from 'react';
import { connect } from 'react-redux';

class SeekerLogin extends Component {
  constructor() {
    
  }
  render() {
    return (
      <div>
        Browse and stuff
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default
  connect(
    mapStateToProps,
  )(SeekerLogin);


// You login and you go to browse
// You send the token and do a GET for jobs
// You have one job that you can like/pass(super like in Balsamiq but treat as stretch?)
// Then you should get another job
// Repeat until no jobs available

//Reducer for jobs

/*### Like a Job
  - [PUT] request to`/jobs/like/:jobId` requires a signed JWT retrieved from successful[POST] to / seekers / login. 
- Nothing is needed in the body. 
- Response body contains a boolean value for `match`, indicating whether the seeker has already been liked for the job.
*/