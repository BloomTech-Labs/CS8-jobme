import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserProfile, updateUserProfile, updateUserPassword } from '../../actions'; 

import {
  BodyContainer,
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  ProfilePic,
  SecurityContainer,
  ConfirmCheck,
  ButtonsContainer,
  Button,
} from '../styles';

class SeekerProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    desiredTitle: '',
    summary: '',
    email: '',
    oldPassword: '',
    confirmPassword: '',
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    const { firstName, lastName, desiredTitle, summary, email } = this.state;

    this.props.updateUserProfile({ firstName, lastName, desiredTitle, summary, email });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateUserPassword({ oldPassword, newPassword, confirmPassword });
  }

  render() {
    const { profile } = this.props;
    
    return (
      <BodyContainer>
        <ChildContainer row>
          <ChildContainer>
            <InputContainer>
              <InputTitle upper>Email:</InputTitle>
                <InputBox
                  placeholder={profile.email}
                  onChange={this.inputHandler}
                  name='email'
                  value={this.state.email}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>First Name:</InputTitle>
                <InputBox
                  placeholder={profile.firstName}
                  onChange={this.inputHandler}
                  name='firstName'
                  value={this.state.firstName}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Last Name:</InputTitle>
                <InputBox
                  placeholder={profile.lastName}
                  onChange={this.inputHandler}
                  name='lastName'
                  value={this.state.lastName}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Desired Title:</InputTitle>
                <InputBox
                  placeholder={profile.desiredTitle}
                  onChange={this.inputHandler}
                  name='desiredTitle'
                  value={this.state.desiredTitle}
                />
            </InputContainer>
          </ChildContainer>
          <ProfilePic src="http://via.placeholder.com/150x150" />
        </ChildContainer>
        <ChildContainer>
          <InputContainer>
            <InputTitle>Summary:</InputTitle>
            <InputBox large
              placeholder={profile.summary}
              onChange={this.inputHandler}
              name='summary'
              value={this.state.summary}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Top Skills:</InputTitle>
            <InputBox
              placeholder={profile.topSkills}
              onChange={this.inputHandler}
              name='topSkills'
              value={this.state.topSkills}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Additional Skills:</InputTitle>
            <InputBox
              placeholder={profile.additionalSkills}
              onChange={this.inputHandler}
              name='additionalSkills'
              value={this.state.additionalSkills}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Familiar With:</InputTitle>
            <InputBox
              placeholder={profile.familiarWith}
              onChange={this.inputHandler}
              name='familiarWith'
              value={this.state.familiarWith}
            />          
          </InputContainer>
          <InputContainer>
            <InputTitle>Experience:</InputTitle>
            <InputTextarea
              placeholder={profile.experience}
              onChange={this.inputHandler}
              name='experience'
              value={this.state.experience}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Education:</InputTitle>         
            <InputTextarea
              placeholder={profile.education}
              onChange={this.inputHandler}
              name='education'
              value={this.state.education}
            />
          </InputContainer>
        </ChildContainer>
        <ButtonsContainer>
          <Button onClick={this.handleChangeInfoSubmit.bind(this)}>
            Save
          </Button>
        </ButtonsContainer>
          <SecurityContainer>
            <InputContainer row>
              <ConfirmCheck
                type='checkbox'
                checked={false}
                onChange={this.inputHandler}
                name='confirmBeforeSpending'
                value={this.state.confirmBeforeSpending}
              />
              Confirm before spending credits
            </InputContainer>
            <InputContainer>
              <InputTitle>Old Password:</InputTitle>
              <InputBox
                placeholder='Old password'
                onChange={this.inputHandler}
                name='oldPassword'
                value={this.state.oldPassword}
              />            
            </InputContainer>
            <InputContainer>
              <InputTitle>New Password:</InputTitle>
              <InputBox
                placeholder='New password'
                onChange={this.inputHandler}
                name='newPassword'
                value={this.state.newPassword}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Confirm Password:</InputTitle>
              <InputBox
                placeholder='Confirm password'
                onChange={this.inputHandler}
                name='confirmPassword'
                value={this.state.confirmPassword}
              />
            </InputContainer>
            <ButtonsContainer>
              <Button onClick={this.handleChangePasswordSubmit.bind(this)}>
                Save
              </Button>
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

export default connect(mapStateToProps, { getUserProfile, updateUserProfile, updateUserPassword })(SeekerProfile);