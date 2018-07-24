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
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const TopTitles = TopContainer.extend`
  flex-direction: column;
  font-size: 20px;
  margin-bottom: 0;
`;
const TopBoxes = TopContainer.extend`
  flex-direction: column;
`;
const TopImg = styled.img`
`;
const Description = TopContainer.extend`
  font-size: 20px;
`;
const DescriptionInput = styled.textarea`
  width: 500px;
  height: 300px;
`;

const SecurityContainer = TopContainer.extend`
  flex-direction: column;
  width: 70%;
  margin-left: 100px;

`;
const ConfirmCheck = styled.label`

`;
const Security = TopContainer.extend`

`;
const SecurityTitles = TopTitles.extend`

`;
const SecurityBoxes = TopTitles.extend`

`;
const SaveButton = styled.button`
  max-width: 250px;
  margin-left: 100px;
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
    const { profile } = this.props.loggedInSeeker;

    return (
      <StyledProfile>
        <TopContainer>
          <TopTitles>
            <div>Email:</div>
            <div>First Name:</div>
            <div>Last Name:</div>
            <div>Desired Title:</div>
          </TopTitles>
          <TopBoxes>
            <form>
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
                value={this.state.companyUrl}
              />
              <input
                placeholder={profile.lastName}
                onChange={this.inputHandler}
                name='lastName'
                value={this.state.companyName}
              />
              <input
                placeholder={profile.desiredTitle}
                onChange={this.inputHandler}
                name='desiredTitle'
                value={this.state.industry}
              />
            </form>
          </TopBoxes>
          <TopImg src="http://via.placeholder.com/150x150" />
        </TopContainer>
        <Description>Summary:
          <form>
            <DescriptionInput
              placeholder={profile.summary}
              onChange={this.inputHandler}
              name='summary'
              value={this.state.description}
            />
          </form>
        </Description>
        <SaveButton onClick={this.handleChangeInfoSubmit.bind(this)}>
          Save
        </SaveButton>
        <SecurityContainer>
          <form>
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
          </form>
          <Security>
            <SecurityTitles>
              <div>Old Password:</div>
              <div>New Password:</div>
              <div>Confirm Password:</div>
            </SecurityTitles>
            <SecurityBoxes>
              <form>
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
              </form>
            </SecurityBoxes>
          </Security>
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