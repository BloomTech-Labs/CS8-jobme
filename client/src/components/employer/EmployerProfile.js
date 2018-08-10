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
  RegisterMessage,
  SecurityContainer,
  ConfirmCheck,
  ButtonsContainer,
  ButtonsBox,
  Button,
} from '../styles';

class EmployerProfile extends Component {
  state = {
    companyName: '',
    companyUrl: '',
    industry: '',
    description: '',
    email: '',
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
    decsriptionLengthOK: true,
  }

  componentDidMount() {
    const { 
      companyName,
      companyUrl,
      industry,
      description,
      email,
     } = this.props.profile;
    this.setState({
      companyName,
      companyUrl,
      industry,
      description,
      email,
    });
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    let { descriptionLengthOK } = this.state;
    if (name === "description") {
      descriptionLengthOK = value.length <= 256;
    }
    this.setState({
      [name]: value,
      descriptionLengthOK,
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
    const { companyName, companyUrl, industry, description, email } = this.state;
    this.confirmProfileChanges();
    
    this.props.updateUserProfile({ companyName, companyUrl, industry, description, email });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const { 
      oldPassword,
      newPassword,
      confirmPassword,
      passwordLengthOk,
      passwordMatch,
    } = this.state ;

    if (passwordLengthOk && passwordMatch) {
      this.props.updateUserPassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
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
              <InputTitle upper>URL:</InputTitle>
                <InputBox
                  value={this.state.companyUrl}
                  type="text"
                  name='companyUrl'
                  onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Company:</InputTitle>
                <InputBox
                  value={this.state.companyName}
                  type="text"
                  name='companyName'
                  onChange={this.inputHandler.bind(this)}
                  />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Industry:</InputTitle>
                <InputBox
                  value={this.state.industry}
                  type="text"
                  name='industry'
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
            <InputTitle>Description:</InputTitle>
            <InputTextarea large
              value={this.state.description}
              type="text"
              name='description'
              onChange={this.inputHandler.bind(this)}
            />
          </InputContainer>
          <RegisterMessage alert={!this.state.descriptionLengthOK}>
            {this.state.description.length}
          </RegisterMessage>
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
        </ChildContainer>
        <SecurityContainer>
          <InputContainer row >
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
                type='password'
                name='oldPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>New Password:</InputTitle>
              <InputBox
                value={this.state.newPassword}
                placeholder='New password'
                type='password'
                name='newPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />
              <RegisterMessage alert>
                {this.state.passwordLengthOk ? '' : 'Password is too short.'}
              </RegisterMessage>
            </InputContainer>
            <InputContainer>
              <InputTitle>Confirm Password:</InputTitle>
              <InputBox
                value={this.state.confirmPassword}
                placeholder='Confirm password'
                type='password'
                name='confirmPassword'
                onChange={this.handlePasswordInput.bind(this)}
              />
              <RegisterMessage alert>
                {this.state.passwordMatch ? '' : 'Passwords do not match.'}
              </RegisterMessage>
            </InputContainer>
            <ButtonsContainer>
              <ButtonsBox column full>
                <RegisterMessage>
                  {this.state.passwordChangesConfirmed ? 'Password change successful' : ''}
                </RegisterMessage>
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
})(EmployerProfile);