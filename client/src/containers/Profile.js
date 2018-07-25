import React, { Component} from 'react';
import { connect } from 'react-redux';
import { EmployerProfile, SeekerProfile } from '../components';
import { getEmployerProfile, getSeekerProfile } from '../actions';
import { withRouter } from 'react-router-dom';
class Profile extends Component {
  componentDidMount() {
    const seekerToken = localStorage.getItem('seekerToken');
    const employerToken = localStorage.getItem('employerToken');

    seekerToken ? this.props.getEmployerProfile(employerToken) : this.props.getSeekerProfile(seekerToken);
  }

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

