import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getEmployerProfile, updateEmployerProfile, updateEmployerPassword } from '../../actions'; 

import {
  StyledProfile,
  ChildContainer,
  UserInfoAndPic,
  Entry,
  ChildTitle,
  ChildBox,
  Img,
  SecurityContainer,
  ConfirmCheck,
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
    const token = localStorage.getItem('employerToken');
    this.props.getEmployerProfile(token);
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('employerToken');
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
              <ChildTitle upper>URL:</ChildTitle>
                <ChildBox
                  placeholder={profile.companyUrl}
                  onChange={this.inputHandler}
                  name='companyUrl'
                  value={this.state.companyUrl}
                />
            </Entry>
            <Entry>
              <ChildTitle upper>Company:</ChildTitle>
                <ChildBox
                  placeholder={profile.companyName}
                  onChange={this.inputHandler}
                  name='companyName'
                  value={this.state.companyName}
                  />
            </Entry>
            <Entry>
              <ChildTitle upper>Industry:</ChildTitle>
                <ChildBox
                  plChildBoxaceholder={profile.industry}
                  onChange={this.inputHandler}
                  name='industry'
                  value={this.state.industry}
                  />
            </Entry>
          </ChildContainer>
            <Img src="http://via.placeholder.com/150x150" />
        </UserInfoAndPic>
        <ChildContainer>
          <Entry>
            <ChildTitle>Description:</ChildTitle>
            <ChildBox large
              placeholder={profile.description}
              onChange={this.inputHandler}
              name='description'
              value={this.state.description}
            />
          </Entry>
          <SaveButton onClick={this.handleChangeInfoSubmit.bind(this)}>
            Save
          </SaveButton>
        </ChildContainer>
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

export default connect(mapStateToProps, { getEmployerProfile, updateEmployerPassword, updateEmployerProfile })(EmployerProfile);