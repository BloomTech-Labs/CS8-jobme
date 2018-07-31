import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getUserProfile, updateUserProfile, updateUserPassword } from '../../actions'; 

import {
  BodyContainer,
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  ProfilePic,
  SecurityContainer,
  ConfirmCheck,
  ButtonsContainer,
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
    confirmBeforeSpending: false
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    const { companyName, companyUrl, industry, description, email } = this.state;

    this.props.updateUserProfile({ companyName, companyUrl, industry, description, email });
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
              <InputTitle upper>URL:</InputTitle>
                <InputBox
                  placeholder={profile.companyUrl}
                  onChange={this.inputHandler}
                  name='companyUrl'
                  value={this.state.companyUrl}
                />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Company:</InputTitle>
                <InputBox
                  placeholder={profile.companyName}
                  onChange={this.inputHandler}
                  name='companyName'
                  value={this.state.companyName}
                  />
            </InputContainer>
            <InputContainer>
              <InputTitle upper>Industry:</InputTitle>
                <InputBox
                  plInputBoxaceholder={profile.industry}
                  onChange={this.inputHandler}
                  name='industry'
                  value={this.state.industry}
                  />
            </InputContainer>
          </ChildContainer>
            <ProfilePic src="http://via.placeholder.com/150x150" />
        </ChildContainer>
        <ChildContainer>
          <InputContainer>
            <InputTitle>Description:</InputTitle>
            <InputBox large
              placeholder={profile.description}
              onChange={this.inputHandler}
              name='description'
              value={this.state.description}
            />
          </InputContainer>
          <ButtonsContainer>
            <Button onClick={this.handleChangeInfoSubmit.bind(this)}>
              Save
            </Button>
          </ButtonsContainer>
        </ChildContainer>
        <SecurityContainer>
          <InputContainer>
            <ConfirmCheck
              type='checkbox'
              checked={false}
              onChange={this.inputHandler}
              name='confirmBeforeSpending'
              value={this.state.confirmBeforeSpending}
            />
            Confirm before spending credits:
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

export default connect(mapStateToProps, { getUserProfile, updateUserPassword, updateUserProfile })(EmployerProfile);