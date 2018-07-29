import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekerProfile, updateSeekerProfile, updateSeekerPassword } from '../../actions'; 

import {
  BodyContainer,
  ChildContainer,
  UserInfoAndPic,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  Img,
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
    confirmBeforeSpending: false
  }

  componentDidMount() {
    const token = this.props.loggedInSeeker.token || localStorage.getItem('seekerToken');
    //TODO: Decide where token will be
    console.log(this.props.loggedInSeeker);
    this.props.getSeekerProfile(token)
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInSeeker.token || localStorage.getItem('seekerToken');
    //TODO: Decide where token will be
    //TODO: Change token userIdx to __Id
    const { firstName, lastName, desiredTitle, summary, email } = this.state;

    this.props.updateSeekerProfile(token, { firstName, lastName, desiredTitle, summary, email });
    console.log('subbmitted');
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('seekerToken');
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateSeekerPassword(token, { oldPassword, newPassword, confirmPassword });
  }

  render() {
    const { profile } = this.props.loggedInSeeker;
    
    return (
      <BodyContainer>
        <UserInfoAndPic>
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
          <Img src="http://via.placeholder.com/150x150" />
        </UserInfoAndPic>
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
              <ConfirmCheck
                type='checkbox'
                checked={false}
                onChange={this.inputHandler}
                name='confirmBeforeSpending'
                value={this.state.confirmBeforeSpending}
              />
              Confirm before spending credits:
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
  return ({ ...state });
};

export default connect(mapStateToProps, { getSeekerProfile, updateSeekerProfile, updateSeekerPassword })(SeekerProfile);