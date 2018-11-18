import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../actions'; 

import {
  BodyContainer,
  InputContainer,
  InputTitle,
  InputBox,
  Notification,
  SecurityContainer,
  ButtonsContainer,
  ButtonsBox,
  Button,
} from '../components/styles';


class PasswordReset extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    passwordLengthOk: true,
    passwordMatch: true,
    passwordChangesValid: false,
  }

  handlePasswordInput({ target }) {
    let { newPassword, confirmPassword } = this.state;
    const { name, value } = target;

    if (name === 'newPassword') {
      newPassword = value;
    } else if (name === 'confirmPassword') {
      confirmPassword = value;
    }

    const passwordLengthOk = !newPassword || newPassword.length >= 8;
    const passwordMatch = newPassword === confirmPassword;
    const passwordChangesValid = passwordLengthOk && passwordMatch && newPassword;
    this.setState({
      passwordLengthOk,
      passwordMatch,
      passwordChangesValid,
      [name]: value,
    });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const {
      newPassword,
      passwordLengthOk,
      passwordMatch,
    } = this.state;
    
    if (passwordLengthOk && passwordMatch) {
      const { userType, resetToken } = this.props.match.params;
      this.props.resetPassword({
        userType,
        resetToken,
        newPassword,
      });
    }

    this.setState({
      newPassword: '',
      confirmPassword: '',
      passwordChangesValid: false,
    });
  }

  confirmProfileChanges = () => {
    this.setState({
      profileAnyChangesMade: false,
    });
  }

  render() { 
    return (
      <BodyContainer>
          <SecurityContainer>
            <InputContainer>
              <InputTitle>New Password:</InputTitle>
              <InputBox
                value={this.state.newPassword}
                placeholder='New password'
                name='newPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />
              <Notification alert>
                {this.state.passwordLengthOk ? '' : 'Password is too short.'}
              </Notification>
            </InputContainer>
            <InputContainer>
              <InputTitle>Confirm Password:</InputTitle>
              <InputBox
                value={this.state.confirmPassword}
                placeholder='Confirm password'
                name='confirmPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />
              <Notification alert>
                {this.state.passwordMatch ? '' : 'Passwords do not match.'}
              </Notification>
            </InputContainer>
            <ButtonsContainer>
              <ButtonsBox column full>
                <Notification>
                  {this.props.passwordChangeSuccess ? 'Password change successful' : ''}
                </Notification>
                <Button
                  onClick={this.handleChangePasswordSubmit.bind(this)}
                  disabled={!this.state.passwordChangesValid}
                >
                  Save
                  </Button>
              </ButtonsBox>
            </ButtonsContainer>
          </SecurityContainer>
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    passwordChangeSuccess: state.user.passwordChangeSuccess
  }
};

export default connect(mapStateToProps, { 
  resetPassword,
})(PasswordReset);