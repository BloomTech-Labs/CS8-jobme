import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekerProfile, updateSeekerProfile, updateSeekerPassword } from '../../actions'; // TODO: update when file structure changes

import {
  StyledProfile,
  ChildContainer,
  Entry,
  ChildTitle,
  ChildBox,
  ChildTextArea,
  UserInfoAndPic,
  Img,
  SecurityContainer,
  ConfirmCheck,
  ButtonContainer,
  SaveButton,
} from '../styles/profileStyles';

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
      <StyledProfile>
        <UserInfoAndPic>
          <ChildContainer>
            <Entry>
              <ChildTitle upper>Email:</ChildTitle>
                <ChildBox
                  placeholder={profile.email}
                  onChange={this.inputHandler}
                  name='email'
                  value={this.state.email}
                />
            </Entry>
            <Entry>
              <ChildTitle upper>First Name:</ChildTitle>
                <ChildBox
                  placeholder={profile.firstName}
                  onChange={this.inputHandler}
                  name='firstName'
                  value={this.state.firstName}
                />
            </Entry>
            <Entry>
              <ChildTitle upper>Last Name:</ChildTitle>
                <ChildBox
                  placeholder={profile.lastName}
                  onChange={this.inputHandler}
                  name='lastName'
                  value={this.state.lastName}
                />
            </Entry>
            <Entry>
              <ChildTitle upper>Desired Title:</ChildTitle>
                <ChildBox
                  placeholder={profile.desiredTitle}
                  onChange={this.inputHandler}
                  name='desiredTitle'
                  value={this.state.desiredTitle}
                />
            </Entry>
          </ChildContainer>
          <Img src="http://via.placeholder.com/150x150" />
        </UserInfoAndPic>
        <ChildContainer>
          <Entry>
            <ChildTitle>Summary:</ChildTitle>
            <ChildBox large
              placeholder={profile.summary}
              onChange={this.inputHandler}
              name='summary'
              value={this.state.summary}
            />           
          </Entry>
          <Entry>
            <ChildTitle>Top Skills:</ChildTitle>
            <ChildBox
              placeholder={profile.topSkills}
              onChange={this.inputHandler}
              name='topSkills'
              value={this.state.topSkills}
            />
          </Entry>
          <Entry>
            <ChildTitle>Additional Skills:</ChildTitle>
            <ChildBox
              placeholder={profile.additionalSkills}
              onChange={this.inputHandler}
              name='additionalSkills'
              value={this.state.additionalSkills}
            />           
          </Entry>
          <Entry>
            <ChildTitle>Familiar With:</ChildTitle>
            <ChildBox
              placeholder={profile.familiarWith}
              onChange={this.inputHandler}
              name='familiarWith'
              value={this.state.familiarWith}
            />          
          </Entry>
          <Entry>
            <ChildTitle>Experience:</ChildTitle>
            <ChildTextArea
              placeholder={profile.experience}
              onChange={this.inputHandler}
              name='experience'
              value={this.state.experience}
            />           
          </Entry>
          <Entry>
            <ChildTitle>Education:</ChildTitle>         
            <ChildTextArea
              placeholder={profile.education}
              onChange={this.inputHandler}
              name='education'
              value={this.state.education}
            />
          </Entry>
        </ChildContainer>
          <SaveButton onClick={this.handleChangeInfoSubmit.bind(this)}>
            Save
          </SaveButton>
          <SecurityContainer>
              <ConfirmCheck
                type='checkbox'
                checked={false}
                onChange={this.inputHandler}
                name='confirmBeforeSpending'
                value={this.state.confirmBeforeSpending}
              />
              Confirm before spending credits:
            <Entry>
              <ChildTitle>Old Password:</ChildTitle>
              <ChildBox
                placeholder='Old password'
                onChange={this.inputHandler}
                name='oldPassword'
                value={this.state.oldPassword}
              />            
            </Entry>
            <Entry>
              <ChildTitle>New Password:</ChildTitle>
              <ChildBox
                placeholder='New password'
                onChange={this.inputHandler}
                name='newPassword'
                value={this.state.newPassword}
              />
            </Entry>
            <Entry>
              <ChildTitle>Confirm Password:</ChildTitle>
              <ChildBox
                placeholder='Confirm password'
                onChange={this.inputHandler}
                name='confirmPassword'
                value={this.state.confirmPassword}
              />
            </Entry>
            <SaveButton onClick={this.handleChangePasswordSubmit.bind(this)}>
              Save
            </SaveButton>
          </SecurityContainer>
      </StyledProfile>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default connect(mapStateToProps, { getSeekerProfile, updateSeekerProfile, updateSeekerPassword })(SeekerProfile);