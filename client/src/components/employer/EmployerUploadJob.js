import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'reactstrap';
import { uploadJob } from '../../actions';
import { connect } from 'react-redux';

class EmployerUploadJob extends Component {
  state = {
    titleAndSalary: '',
    topSkills: '',
    additionalSkills: '',
    familiarWith: '',
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
    return <div>
        <h3>Upload a Job: </h3>
      <Form onSubmit={this.submitHandler.bind(this)}>
          <Input type="text" name="titleAndSalary" placeholder="Title and Salary" onChange={this.inputHandler.bind(this)} />
          <Input type="textarea" name="topSkills" placeholder="Required Skills" onChange={this.inputHandler.bind(this)} />
          <Input type="textarea" name="additionalSkills" placeholder="Other Useful Skills" onChange={this.inputHandler.bind(this)} />
          <Input type="textarea" name="familiarWith" placeholder="Other experience we would like" onChange={this.inputHandler.bind(this)} />
          <Input type="textarea" name="description" placeholder="Description" onChange={this.inputHandler.bind(this)} />
        <Button type="submit">Submit Job</Button>
      </Form>
      </div>;
  }
}


export default withRouter(connect(null, {uploadJob})(EmployerUploadJob));