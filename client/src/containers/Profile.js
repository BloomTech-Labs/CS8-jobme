import React, { Component} from 'react';
import { connect } from 'react-redux';
import { EmployerProfile, SeekerProfile } from '../components';
import { getUserProfile } from '../actions';
import { withRouter } from 'react-router-dom';
class Profile extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem('employerToken') ? <EmployerProfile /> : <SeekerProfile />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getUserProfile })(Profile));

