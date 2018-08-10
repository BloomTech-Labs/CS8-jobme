import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeSeeker } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  Button,
  DropDownArrow,
} from '../styles';

class EmployerBrowseView extends Component {
  state ={ 
    expandedView: false
  }

  toggleView = () => {
    this.setState({ expandedView: !this.state.expandedView });
  };

  buttonHandler(string) {
    let options = {};
    if (string) {
      options = {
        [string]: true,
      };
    }
    this.props.likeSeeker(this.props.jobSeeker._id, this.props.job._id, options);
  }

  render() {
    const {
      summary,
      topSkills,
      additionalSkills,
      familiarWith,
      experience,
      education,
      desiredTitle,
      firstName,
      lastName,
      imgUrl,
    } = this.props.jobSeeker;

    return (
      <BrowseView>
        <ChildContainer row border>
        <ProfilePic src={imgUrl || "http://via.placeholder.com/250x250"} />
          <ChildContainer>
            <Title big center>{`${firstName} ${lastName}`}</Title>
            <Paragraph center>{summary}</Paragraph>
          </ChildContainer>
        </ChildContainer>
        <Title center borderBottom>
          Desired Title: {desiredTitle}
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
            <Title>Experience:</Title>
            <Paragraph>{experience}</Paragraph>
            <Title borderTop>Education:</Title>
            <Paragraph>{education}</Paragraph>
          </div>
        : <div/>}
        <ButtonsContainer browse>
          <Button onClick={() => this.buttonHandler('skip')}>Skip</Button>
          <Button onClick={() => this.buttonHandler('superLike')}>Super</Button>
          <Button onClick={() => this.buttonHandler()}>Like</Button>
        </ButtonsContainer>
      </BrowseView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.seekers.job,
    jobSeeker: state.seekers.availableSeekers[0],
  };
};

export default connect(mapStateToProps, { likeSeeker })(EmployerBrowseView);
