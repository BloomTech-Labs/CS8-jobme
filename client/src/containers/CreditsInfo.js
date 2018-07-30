import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EmployerCreditsInfo from '../components/employer/EmployerCreditsInfo';
import SeekerCreditsInfo from '../components/seeker/SeekerCreditsInfo';

class CreditsInfo extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem('employerToken') ? <EmployerCreditsInfo /> : <SeekerCreditsInfo />}
      </div>
    );
  }
};

export default withRouter(CreditsInfo);