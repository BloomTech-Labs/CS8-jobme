import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekerProfile, updateSeekerProfile, updateSeekerPassword } from '../../actions'; // TODO: update when file structure changes

import styled from 'styled-components';
// import { runInThisContext } from 'vm';

const StyledProfile = styled.div`
  min-width: 400px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ChildContainer = styled.div`
  display: flex;
  width: 100%;
`;
const ChildTitles = ChildContainer.extend`
  width: 300px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
`;
const NamelessContainer = ChildContainer.extend`
  justify-content: space-between;
`;
const ChildBoxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const Img = styled.img`
`;
// TODO: Wasting too much time on this but can't figure out why
// TopTitle length is 218px when set to 300px.
const SecurityContainer = ChildContainer.extend`
  flex-direction: column;
  width: 70%;
  margin-left: 20%;
`;
const ConfirmCheck = styled.div`
  font-size: 16px;
`;
const ButtonContainer = ChildContainer.extend`
  justify-content: center;
`;
const SaveButton = styled.button`
  width: 200px;
`;

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
    const token = this.props.loggedInSeeker.token || localStorage.getItem('token');
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
    const token = this.props.loggedInSeeker.token || localStorage.getItem('token');
    //TODO: Decide where token will be
    //TODO: Change token userIdx to __Id
    const { firstName, lastName, desiredTitle, summary, email } = this.state;

    this.props.updateSeekerProfile(token, { firstName, lastName, desiredTitle, summary, email });
    console.log('subbmitted');
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateSeekerPassword(token, { oldPassword, newPassword, confirmPassword });
  }

  render() {
    // console.log(this.props.loggedInEmployer.profile.email);
    const { profile } = this.props.loggedInSeeker;
    return (
      <StyledProfile>
        <ChildContainer>
          <ChildTitles>
            <div>Email:</div>
            <div>First Name:</div>
            <div>Last Name:</div>
            <div>Desired Title:</div>
          </ChildTitles>
          <NamelessContainer>
            <ChildBoxes>
              <input
                placeholder={profile.email}
                onChange={this.inputHandler}
                name='email'
                value={this.state.email}
              />
              <input
                placeholder={profile.firstName}
                onChange={this.inputHandler}
                name='firstName'
                value={this.state.firstName}
              />
              <input
                placeholder={profile.lastName}
                onChange={this.inputHandler}
                name='lastName'
                value={this.state.lastName}
              />
              <input
                placeholder={profile.desiredTitle}
                onChange={this.inputHandler}
                name='desiredTitle'
                value={this.state.desiredTitle}
              />
            </ChildBoxes>
            <Img src="http://via.placeholder.com/150x150" />
          </NamelessContainer>
        </ChildContainer>
        <ChildContainer>
          <ChildTitles>
            <div>Summary:</div>
            <div>Top Skills:</div>
            <div>Additional Skills:</div>
            <div>Familiar With:</div>
            <div>Experience:</div>
            <div>Education:</div>
          </ChildTitles>
          <ChildBoxes>
            <textarea
              placeholder={profile.summary}
              onChange={this.inputHandler}
              name='summary'
              value={this.state.summary}
            />
            <input
              placeholder={profile.topSkills}
              onChange={this.inputHandler}
              name='topSkills'
              value={this.state.topSkills}
            />
            <input
              placeholder={profile.additionalSkills}
              onChange={this.inputHandler}
              name='additionalSkills'
              value={this.state.additionalSkills}
            />
            <input
              placeholder={profile.familiarWith}
              onChange={this.inputHandler}
              name='familiarWith'
              value={this.state.familiarWith}
            />
            <textarea
              placeholder={profile.experience}
              onChange={this.inputHandler}
              name='experience'
              value={this.state.experience}
            />
            <textarea
              placeholder={profile.education}
              onChange={this.inputHandler}
              name='education'
              value={this.state.education}
            />
          </ChildBoxes>
        </ChildContainer>
        <ButtonContainer>
          <SaveButton onClick={this.handleChangeInfoSubmit.bind(this)}>
            Save
          </SaveButton>
        </ButtonContainer>
        <SecurityContainer>
          <ConfirmCheck>
            <input
              type='checkbox'
              checked={false}
              onChange={this.inputHandler}
              name='confirmBeforeSpending'
              value={this.state.confirmBeforeSpending}
            />
            Confirm before spending credits:
          </ConfirmCheck>
          <NamelessContainer>
            <ChildTitles>
              <div>Old Password:</div>
              <div>New Password:</div>
              <div>Confirm Password:</div>
            </ChildTitles>
            <ChildBoxes>
              <input
                placeholder='Old password'
                onChange={this.inputHandler}
                name='oldPassword'
                value={this.state.oldPassword}
              />
              <input
                placeholder='New password'
                onChange={this.inputHandler}
                name='newPassword'
                value={this.state.newPassword}
              />
              <input
                placeholder='Confirm password'
                onChange={this.inputHandler}
                name='confirmPassword'
                value={this.state.confirmPassword}
              />
            </ChildBoxes>
          </NamelessContainer>
          <ButtonContainer>
            <SaveButton onClick={this.handleChangePasswordSubmit.bind(this)}>
              Save
            </SaveButton>
          </ButtonContainer>
        </SecurityContainer>
      </StyledProfile>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default connect(mapStateToProps, { getSeekerProfile, updateSeekerProfile, updateSeekerPassword })(SeekerProfile);