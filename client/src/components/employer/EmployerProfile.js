import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getEmployerProfile, updateEmployerProfile, updateEmployerPassword } from '../../actions'; 

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
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');
    //TODO: Decide where token will be
    this.props.getEmployerProfile(token)
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeInfoSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');
    //TODO: Decide where token will be
    //TODO: Change token userIdx to __Id
    const { companyName, companyUrl, industry, description, email } = this.state;

    this.props.updateEmployerProfile(token, { companyName, companyUrl, industry, description, email });
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');
    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.updateEmployerPassword(token, { oldPassword, newPassword, confirmPassword });
  }

  render() {
    // console.log(this.props.loggedInEmployer.profile.email);
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