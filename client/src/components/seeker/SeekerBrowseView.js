import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { likeJob } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  DropDownArrow,
  Button,
} from '../styles';

class SeekerBrowseView extends Component {
  state = {
    expandedView: false
  }

  toggleView = () => {
    this.setState({ expandedView: !this.state.expandedView });
  };

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
      createdOn
    } = this.props.job;
    
    return (
      <BrowseView>
        <ChildContainer row border>
          <ProfilePic src={imgUrl || "http://via.placeholder.com/250x250"}/>
          <ChildContainer>
            <Title big center>{company.companyName}</Title>
            <Paragraph center>{company.description}</Paragraph>
          </ChildContainer>
        </ChildContainer>
        <Title center borderBottom>
          {titleAndSalary}
        </Title>
        <Paragraph big center>
          | {topSkills.map(skill => skill + " | ")}
        </Paragraph>
        <Paragraph center>
          | {additionalSkills.length > 0 ? additionalSkills.map(skill => skill + " | ") : <span />}
        </Paragraph>
        <Paragraph center>
          | {familiarWith.length > 0 ? familiarWith.map(skill => skill + " | ") : <span />}
        </Paragraph>
        <Title borderBottom borderTop center>
          <DropDownArrow
            onClick={this.toggleView.bind(this)}
            open={this.state.expandedView}
          >
            &#x21A8;
          </DropDownArrow>
        </Title>
        {this.state.expandedView ?
          <div>
            <Title>Job Description:</Title>
            <Paragraph>{description}</Paragraph>
            <Title borderTop>Requirements:</Title>
            <Paragraph>{description} </Paragraph>
          </div>
          : <div />}
                  <Paragraph center>Posted {moment(createdOn).fromNow()}</Paragraph>
        <ButtonsContainer browse>
          <Button color='#ff5016' onClick={() => this.buttonHandler('skip')}>Skip</Button>
          <Button color='#ff16c4' onClick={() => this.buttonHandler('superLike')}>Super</Button>
          <Button color='#16ff1e' onClick={() => this.buttonHandler()}>Like</Button>
        </ButtonsContainer>
      </BrowseView>
    );
  }
}

export default connect(null, { likeJob })(SeekerBrowseView);
