import React, { Component} from 'react';
import { connect } from 'react-redux';
import { EmployerProfile, SeekerProfile } from '../components';
import { getEmployerProfile, getSeekerProfile } from '../actions';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.loggedInEmployer ? <EmployerProfile /> : <SeekerProfile />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getSeekerProfile, getEmployerProfile })(Profile));

