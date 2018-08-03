import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { editJob } from '../../actions';

import {
  BodyContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  ButtonsContainer,
  Button,
} from '../styles';

class EditJob extends Component {
  state = {
    titleAndSalary: '',
    topSkills: '',
    additionalSkills: '',
    familiarWith: '',
    description: '',
  };

  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    this.setState( this.props.availableJobs[jobId] );
  }

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
    const jobId = this.props.match.params.jobId;
    const realId = this.props.availableJobs[jobId]._id;
    event.preventDefault();
    this.props.editJob(realId, this.state);
  };

  render() {
    return <BodyContainer>
      <form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer>
          <InputTitle>Title and Salary: </InputTitle>
          <InputBox
            value={this.state.titleAndSalary}
            type="text"
            name="titleAndSalary"
            onChange={this.inputHandler.bind(this)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Top Skills: </InputTitle>
          <InputBox
            value={this.state.topSkills}
            type="textarea"
            name="topSkills"
            onChange={this.inputHandler.bind(this)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Additional Skills: </InputTitle>
          <InputTextarea
            value={this.state.additionalSkills}
            type="textarea"
            name="additionalSkills"
            onChange={this.inputHandler.bind(this)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Familiar with: </InputTitle>
          <InputTextarea
            value={this.state.familiarWith}
            type="textarea"
            name="familiarWith"
            onChange={this.inputHandler.bind(this)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Description: </InputTitle>
          <InputTextarea large
            value={this.state.description}
            type="textarea"
            name="description"
            onChange={this.inputHandler.bind(this)}
          />
        </InputContainer>
        <ButtonsContainer>
          <Button type="submit">Save</Button>
          <Button type="submit">Submit Job</Button>
        </ButtonsContainer>
      </form>
    </BodyContainer>;
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
});

export default withRouter(connect(mapStateToProps, { editJob })(EditJob))