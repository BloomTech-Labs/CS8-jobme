import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EmployerNavBarInfo from '../components/employer/EmployerNavBarInfo';
import SeekerNavBarInfo from '../components/seeker/SeekerNavBarInfo';

class NavBarInfo extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem('employerToken') ? <EmployerNavBarInfo /> : <SeekerNavBarInfo />}
      </div>
    );
  }
};

export default withRouter(NavBarInfo);