import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginSeeker } from '../../actions';

import { ChildContainer, Button, Box } from '../styles/loginStyles';

class SeekerLogin extends Component {
  state = {
    email: '',
    password: '',
  };

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.loginSeeker(this.state);
  };

  render() {
    if (this.props.loggedInSeeker.token) {
      this.props.history.push('/profile');
    }
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <ChildContainer column>
            <Box
              onChange={this.inputHandler}
              placeholder="Enter email"
              name="email"
              value={this.state.email}
            />
            <Box
              onChange={this.inputHandler}
              placeholder="Enter password"
              name="password"
              value={this.state.password}
            />
          </ChildContainer>
          <ChildContainer>
            <Button onSubmit={this.submitHandler}>Login</Button>
          </ChildContainer>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(connect(mapStateToProps, { loginSeeker })(SeekerLogin));
