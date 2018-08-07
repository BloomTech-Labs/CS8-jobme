import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Progress from '../../containers/Progress';
import { getJobMatches } from '../../actions';

import {
  GridContainer,
  Card,
  CardHeader,
  CardPic,
  CardName,
  CardTitle,
  ButtonsContainer,
  Link,
  CardButton,
} from '../styles';

class SeekerMatches extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getJobMatches();
    }
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    const { matchedJobs } = this.props;

    // const { companyName, imgUrl } = this.props.company;
    console.log('HERE!', matchedJobs);
    // console.log('NAME', companyName);


    return (
      <GridContainer>
        {this.props.matchedJobs.map((job, i) => {
            return (
            <Card index={`${job.titleAndSalary}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                    <CardPic src={job.company.imgUrl || "http://via.placeholder.com/100x100"} alt="Company" />
                  <CardName>{job.company.companyName}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{job.titleAndSalary}</CardTitle>
              <ButtonsContainer>
                <CardButton archive />
                <CardButton email />
              </ButtonsContainer>
            </Card>
            )
          })}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  matchedJobs: state.jobs.matchedJobs,
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(connect(mapStateToProps, { getJobMatches })(SeekerMatches));
