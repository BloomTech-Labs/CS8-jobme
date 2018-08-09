import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { uploadJob } from '../../actions';
import { connect } from 'react-redux';

import {
  BodyContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  ButtonsContainer,
  Button,
} from '../styles';

class EmployerUploadJob extends Component {
  state = {
    titleAndSalary: '',
    topSkills: [],
    additionalSkills: [],
    familiarWith: [],
    description: '',
  };

  inputHandler = ({ target }) => {
    const { name, value } = target;
    if (name === "topSkills") {
      const topSkills = value.split(/, */);
      this.setState({ topSkills });
    } else {
      this.setState({ [name]: value });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.uploadJob(this.state);
    };

  render() {
    return <BodyContainer>
      <form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer>
          <InputTitle>Title and Salary: </InputTitle>
          <InputBox 
            type="text" 
            name="titleAndSalary" 
            placeholder="Title and Salary" 
            onChange={this.inputHandler.bind(this)} 
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Top Skills: </InputTitle>
          <InputBox 
            type="textarea" 
            name="topSkills" 
            placeholder="Required. 5 max. Separate with commas." 
            onChange={this.inputHandler.bind(this)} 
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Additional Skills: </InputTitle>
          <InputTextarea
            type="textarea" 
            name="additionalSkills" 
            placeholder="Separate with commas." 
            onChange={this.inputHandler.bind(this)} 
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Familiar with: </InputTitle>
          <InputTextarea
            type="textarea" 
            name="familiarWith" 
            placeholder="Separate with commas." 
            onChange={this.inputHandler.bind(this)} 
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Description: </InputTitle>
          <InputTextarea large 
            type="textarea" 
            name="description" 
            placeholder="Describe the job in detail" 
            onChange={this.inputHandler.bind(this)} 
          />
        </InputContainer>
         <ButtonsContainer>
            <Button type="submit">Submit Job</Button>
          </ButtonsContainer>
      </form>
      </BodyContainer>;
  }
}


export default withRouter(connect(null, {uploadJob})(EmployerUploadJob));