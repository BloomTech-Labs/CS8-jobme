import React, { Component } from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'reactstrap';

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
    const token = localStorage.getItem('employerToken');
    console.log('token', token);
    const requestOptions = { headers: { Authorization: `Bearer ${token}` } } 
    axios.post('/jobs', this.state, requestOptions).then(response => { 
      console.log('success', response);
    }).catch(err => console.log('err', err));
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


export default EmployerUploadJob