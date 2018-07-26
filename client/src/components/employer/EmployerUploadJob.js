import React, { Component } from 'react';

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
    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    //do axios stuff here
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

// -[POST] request to`/jobs/` requires a signed JWT retrieved from successful[POST] to / employers / login. 
// - Request takes the following string fields from a JSON document in request body(\* required):
// - titleAndSalary
//   - topSkills
//   - additionalSkills
//   - familiarWith
//   - description
//   - Response body will contain new `{ job }` document to confirm success

export default EmployerUploadJob