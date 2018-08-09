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
} from '../styles';

class SeekerBrowseView extends Component {
  buttonHandler(string) {
    const options = {
      [string]: true,
    };
    this.props.likeJob(this.props.job._id, options);
  }

  render() {
    const {
      company,
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
      imgUrl,
    } = this.props.job;
    
    return (
      <BrowseView>
        <ChildContainer row>
          <ProfilePic src={imgUrl || "http://via.placeholder.com/250x250"}/>
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
          <Button onClick={() => this.buttonHandler('superLike')}>Super</Button>
          <Button onClick={() => this.buttonHandler()}>Like</Button>
        </ButtonsContainer>
      </BrowseView>
    );
  }
}

export default connect(null, { likeJob })(SeekerBrowseView);
