import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likeJob } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  Button,
  Collapser,
} from '../styles';

class SeekerBrowseView extends Component {
  buttonHandler(string) {
    const options = {
      [string]: true,
    };
    this.props.likeJob(this.props.jobSeeker._id, options);
  }

  render() {
    const {
      company,
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
    } = this.props.job;

    return (
      <BrowseView>
        <ChildContainer row>
          <ProfilePic src="http://via.placeholder.com/150x150"/>
          <ChildContainer>
            <Title center>{company.companyName}</Title>
            <Paragraph center>{company.description}</Paragraph>
          </ChildContainer>
        </ChildContainer>
        <Title>{titleAndSalary}</Title>
        <Paragraph>
          {`${topSkills} ${
            additionalSkills} ${
            familiarWith}`}
        </Paragraph>
        <Title>Description:</Title>
        <Paragraph>{description}</Paragraph>
        <Title>Requirements:</Title>
        <Paragraph>{description} model needs requirements</Paragraph>
        <ButtonsContainer>
          <Button onClick={() => this.buttonHandler('skip')}>Skip</Button>
          <Button onClick={() => this.buttonHandler('super')}>Super</Button>
          <Button onClick={() => this.buttonHandler()}>Like</Button>
        </ButtonsContainer>
        <Collapser/>
      </BrowseView>
    );
  }
}

export default connect(null, { likeJob })(SeekerBrowseView);