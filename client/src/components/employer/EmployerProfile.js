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
    confirmBeforeSpending: false
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
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const { companyName, companyUrl, industry, description, email } = this.state;

    this.props.updateUserProfile({ companyName, companyUrl, industry, description, email });
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
          <ButtonsContainer>
            <Button onClick={this.handleChangeInfoSubmit.bind(this)}>
              Save
            </Button>
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
                onChange={this.inputHandler.bind(this)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>New Password:</InputTitle>
              <InputBox
                value={this.state.newPassword}
                placeholder='New password'
                type='password'
                name='newPassword'
                onChange={this.inputHandler.bind(this)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Confirm Password:</InputTitle>
              <InputBox
                placeholder='Confirm password'
                onChange={this.inputHandler}
                type='password'
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

export default connect(mapStateToProps, {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
})(EmployerProfile);