import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmployerProfile } from '../../actions';

import { Container, Row, Col, Button } from 'reactstrap';

class EmployerProfile extends Component {
  componentDidMount() {
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');

    this.props.getEmployerProfile(token)
  }

  render() {
    console.log(this.props.loggedInEmployer.profile.email);
    const { profile } = this.props.loggedInEmployer;
    return (

      <Container>
        <Row>
          <Col>
            <Row className='email'>
              Email: {profile.email}
            </Row>
            <Row className='firstName'>
              First Name:{profile.name}
            </Row>
            <Row className='lastName'>
              Last name: {profile.name}
            </Row>
            <Row className='Company'>
              Company: {profile.companyName}
            </Row>
          </Col>
          <Col>
            <img src="http://via.placeholder.com/150x150" />
          </Col>
        </Row>
        <Row>
          Summary: {profile.description}
        </Row>
        <Row>
          <Col>
            <Row>
              Confirm before spending credits:
            </Row>
            <Row>
              Old Password:
            </Row>
            <Row>
              New Password:
            </Row>
            <Row>
              Confirm Password:
            </Row>
            <Row>
              <Button>Save</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default connect(mapStateToProps, { getEmployerProfile })(EmployerProfile);