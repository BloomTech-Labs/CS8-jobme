import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfilePicContainer from './ProfilePicContainer';

import { getUserProfile, updateUserProfile, updateUserPassword } from '../../actions'; 

import {
  BodyContainer,
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  Notification,
  SecurityContainer,
  ConfirmCheck,
  ButtonsContainer,
  ButtonsBox,
  Button,
} from '../styles';


class SeekerProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    desiredTitle: '',
    summary: '',
    email: '',
    topSkills: [],
    additionalSkills: [],
    familiarWith: [],
    experience: '',
    education: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showUploader: false,
    confirmBeforeSpending: false,
    profileChangesConfirmed: false,
    profileAnyChangesMade: false,
    passwordChangesConfirmed: false,
    passwordLengthOk: true,
    passwordMatch: true,
    passwordChangesValid: false,
    summaryLengthOK: true,
  }

  componentDidMount() {
    const {
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
      topSkills,
      additionalSkills,
      familiarWith,
      experience,
      education,
    } = this.props.profile;
    this.setState({
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
      topSkills,
      additionalSkills,
      familiarWith,
      experience,
      education,
    });
  }

  inputHandler = ({ target }) => {
    let splitValue;
    const { name, value } = target;
    let { summaryLengthOK } = this.state;
    const skillsArrays = ['topSkills', 'additionalSkills', 'familiarWith'];
    if (skillsArrays.includes(name)) {
      splitValue = value.split(/, */)
    } 
    else if (name === 'summary') {
      summaryLengthOK = value.length <= 256;
    }
    this.setState({
      [name]: splitValue || value,
      summaryLengthOK,
      profileAnyChangesMade: true,
      profileChangesConfirmed: false,
    });
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
      passwordChangesConfirmed: false,
      passwordLengthOk,
      passwordMatch,
      passwordChangesValid,
      [name]: value,
    });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
      topSkills,
      additionalSkills,
      familiarWith,
      experience,
      education,
    } = this.state;
    this.confirmProfileChanges();

    this.props.updateUserProfile({
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
      topSkills,
      additionalSkills,
      familiarWith,
      experience,
      education,
    });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      passwordLengthOk,
      passwordMatch,
    } = this.state;

    if (passwordLengthOk && passwordMatch) {
      this.props.updateUserPassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
    }

    this.setState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordChangesConfirmed: true,
      passwordChangesValid: false,
    });
  }

  confirmProfileChanges = () => {
    this.setState({
      profileChangesConfirmed: true,
      profileAnyChangesMade: false,
    });
  }

  render() { 
    return (
      <BodyContainer>
        <ChildContainer row>
          <ChildContainer>
            <InputContainer>
              <InputTitle upper>Email:</InputTitle>
                <InputBox
                  value={this.state.email}
                  type="text"
                  name='email'
                onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>First Name:</InputTitle>
                <InputBox
                  value={this.state.firstName}
                  type="text"
                  name='firstName'
                  onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Last Name:</InputTitle>
                <InputBox
                  value={this.state.lastName}
                  type="text"
                  name='lastName'
                  onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Desired Title:</InputTitle>
                <InputBox
                  value={this.state.desiredTitle}
                  type="text"
                  name='desiredTitle'
                  onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
          </ChildContainer>
          <ProfilePicContainer 
            profile={this.props.profile}
          />
        </ChildContainer>
        <ChildContainer>
          <InputContainer>
            <InputTitle>Summary:</InputTitle>
            <InputTextarea large
              value={this.state.summary}
              type="text"
              name='summary'
              onChange={this.inputHandler.bind(this)}
            />           
          </InputContainer>
          <Notification alert={!this.state.summaryLengthOK}>
                {this.state.summary.length}
          </Notification>
          <InputContainer>
            <InputTitle>Top Skills:</InputTitle>
            <InputBox
            value={this.state.topSkills.join(',')}
            type="text"
              name='topSkills'
              onChange={this.inputHandler.bind(this)}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Additional Skills:</InputTitle>
            <InputBox
            value={this.state.additionalSkills.join(',')}
            type="text"
              name='additionalSkills'
              onChange={this.inputHandler.bind(this)}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Familiar With:</InputTitle>
            <InputBox
            value={this.state.familiarWith.join(',')}
            type="text"
              name='familiarWith'
              onChange={this.inputHandler.bind(this)}
            />          
          </InputContainer>
          <InputContainer>
            <InputTitle>Experience:</InputTitle>
            <InputTextarea large
              value={this.state.experience}
              type="text"
              name='experience'
              onChange={this.inputHandler.bind(this)}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Education:</InputTitle>         
            <InputTextarea
              value={this.state.education}
              type="text"
              name='education'
              onChange={this.inputHandler.bind(this)}
            />
          </InputContainer>
        </ChildContainer>
        <ButtonsContainer>
          <ButtonsBox column>
            {this.state.profileChangesConfirmed ? "Your changes have been saved" : ""}
            <Button
              onClick={this.handleChangeInfoSubmit.bind(this)}
              disabled={!this.state.profileAnyChangesMade}
            >
              Save
              </Button>
          </ButtonsBox>
        </ButtonsContainer>
          <SecurityContainer>
            <InputContainer row>
              <ConfirmCheck
                value={this.state.confirmBeforeSpending}
                type='checkbox'
                name='confirmBeforeSpending'
                checked={this.state.confirmBeforeSpending}
                onChange={this.inputHandler.bind(this)}
              />
              Confirm before spending credits
            </InputContainer>
            <InputContainer>
              <InputTitle>Old Password:</InputTitle>
              <InputBox
                value={this.state.oldPassword}
                placeholder='Old password'
                name='oldPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />            
            </InputContainer>
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
                  {this.state.passwordChangesConfirmed ? 'Password change successful' : ''}
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
  }
};

export default connect(mapStateToProps, { 
  getUserProfile, 
  updateUserProfile, 
  updateUserPassword,
})(SeekerProfile);