import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getEmployerProfile, updateEmployerProfile, updateEmployerPassword } from '../../actions'; 

import {
  StyledProfile,
  ChildContainer,
  ChildTitles,
  NamelessContainer,
  ChildBoxes,
  Img,
  SecurityContainer,
  ConfirmCheck,
  ButtonContainer,
  SaveButton,
} from '../styles/profileStyles';

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
    confirmBeforeSpending: false
  }

  componentDidMount() {
    const token = this.props.loggedInEmployer.token || localStorage.getItem('employerToken');
    //TODO: Decide where token will be
    this.props.getEmployerProfile(token)
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('employerToken');
    //TODO: Decide where token will be
    //TODO: Change token userIdx to __Id
    const { companyName, companyUrl, industry, description, email } = this.state;

    this.props.updateEmployerProfile(token, { companyName, companyUrl, industry, description, email });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('employerToken');
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateEmployerPassword(token, { oldPassword, newPassword, confirmPassword });
  }

  render() {
    const { profile } = this.props.loggedInEmployer;

    return (
      <StyledProfile>
        <ChildContainer>
          <ChildTitles>
            <div>Email:</div>
            <div>URL:</div>
            <div>Company:</div>
            <div>Industry:</div>
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
                placeholder={profile.companyUrl}
                onChange={this.inputHandler}
                name='companyUrl'
                value={this.state.companyUrl}
              />
              <input
                placeholder={profile.companyName}
                onChange={this.inputHandler}
                name='companyName'
                value={this.state.companyName}
              />
              <input
                placeholder={profile.industry}
                onChange={this.inputHandler}
                name='industry'
                value={this.state.industry}
              />
            </ChildBoxes>
            <Img src="http://via.placeholder.com/150x150" />
          </NamelessContainer>
        </ChildContainer>
        <ChildContainer>
          <ChildTitles>
            <div>Description:</div>
          </ChildTitles>
          <ChildBoxes>
            <textarea
              placeholder={profile.description}
              onChange={this.inputHandler}
              name='description'
              value={this.state.description}
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

export default connect(mapStateToProps, { getEmployerProfile, updateEmployerPassword, updateEmployerProfile })(EmployerProfile);