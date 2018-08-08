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
  ButtonsBox,
  Button,
} from '../styles';

class EditJob extends Component {
  state = {
    titleAndSalary: '',
    topSkills: '',
    additionalSkills: '',
    familiarWith: '',
    description: '',
    isActive: '',
    changesConfirmed: false,
    anyChangesMade: false,
  };

  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    this.setState( this.props.availableJobs[jobId] );
  }

  inputHandler = ({ target }) => {
    this.setState({
      anyChangesMade: true,
      changesConfirmed: false,
    });
    const { name, value } = target;

    if (name === "isActive") {
      const { isActive } = this.state;
      this.setState({
        isActive: !isActive,
      })
    }
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

  confirmChanges = () => {
    this.setState({
      changesConfirmed: true,
      anyChangesMade: false,
    });
  }

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
          <ButtonsBox left>
            <input 
              type="checkbox"
              checked={this.state.isActive} 
              onClick={() => this.setState({ isActive: !this.state.isActive })}
            /> Active Post
          </ButtonsBox>
          <ButtonsBox column>
            {this.state.changesConfirmed ? "Your changes have been saved" : ""}
            <Button
              type="submit"
              disabled={!this.state.anyChangesMade}
              onClick={this.confirmChanges.bind(this)}
            >
              Save
            </Button>
          </ButtonsBox>
          <ButtonsBox/>
        </ButtonsContainer>
      </form>
    </BodyContainer>;
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
});

export default withRouter(connect(mapStateToProps, { editJob })(EditJob))