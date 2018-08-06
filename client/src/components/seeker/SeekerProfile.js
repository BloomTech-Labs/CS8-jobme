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
    showUploader: false,
    confirmBeforeSpending: false
  }

  componentDidMount() {
    const {
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
    } = this.props.profile;
    this.setState({
      firstName,
      lastName,
      desiredTitle,
      summary,
      email,
    });
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, desiredTitle, summary, email } = this.state;

    this.props.updateUserProfile({ firstName, lastName, desiredTitle, summary, email });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateUserPassword({ oldPassword, newPassword, confirmPassword });
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
          <InputContainer>
            <InputTitle>Top Skills:</InputTitle>
            <InputBox
              value={this.state.topSkills}
              type="text"
              name='topSkills'
              onChange={this.inputHandler.bind(this)}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Additional Skills:</InputTitle>
            <InputBox
              value={this.state.additionalSkills}
              type="text"
              name='additionalSkills'
              onChange={this.inputHandler.bind(this)}
            />           
          </InputContainer>
          <InputContainer>
            <InputTitle>Familiar With:</InputTitle>
            <InputBox
              value={this.state.familiarWith}
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
          <Button onClick={this.handleChangeInfoSubmit.bind(this)}>
            Save
          </Button>
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
                onChange={this.inputHandler.bind(this)}
              />            
            </InputContainer>
            <InputContainer>
              <InputTitle>New Password:</InputTitle>
              <InputBox
                value={this.state.newPassword}
                placeholder='New password'
                name='newPassword'
                onChange={this.inputHandler.bind(this)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Confirm Password:</InputTitle>
              <InputBox
                value={this.state.confirmPassword}
                placeholder='Confirm password'
                name='confirmPassword'
                onChange={this.inputHandler.bind(this)}
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