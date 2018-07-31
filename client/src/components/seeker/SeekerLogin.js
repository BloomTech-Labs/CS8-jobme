import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';

import { ChildContainer, ButtonsContainer, Button, InputBox } from '../styles/';

class SeekerLogin extends Component {
  state = {
    email: '',
    password: '',
  };

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <ChildContainer column>
            <InputBox
              onChange={this.inputHandler}
              placeholder="Enter email"
              name="email"
              value={this.state.email}
            />
            <InputBox
              onChange={this.inputHandler}
              placeholder="Enter password"
              name="password"
              value={this.state.password}
            />
          </ChildContainer>
          <ChildContainer>
            <ButtonsContainer>
              <Button onSubmit={this.submitHandler}>Login</Button>
            </ButtonsContainer>
          </ChildContainer>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(connect(mapStateToProps, { loginUser })(SeekerLogin));
