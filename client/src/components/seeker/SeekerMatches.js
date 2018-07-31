import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserProfile } from '../../actions';

import {
  GridContainer,
  Card,
  CardHeader,
  CardPic,
  CardName,
  CardTitle,
  ButtonsContainer,
  Button,
  Link,
} from '../styles';


class SeekerMatches extends Component {
  state = {
    matches: (n) => {
      const data = [];
      while (n > 0) {
        data.push(
          {
            companyName: 'Aperture Labs',
            jobTitle: 'Test Subject',
            email: 'williamwinberg89@gmail.com'
          }
        );
        n--;
      }
      return data;
    }
  }

  render() {
    // const { submittedJobs } = this.props.loggedInEmployer.profile;
    // console.log('ATENTION', this.props.loggedInEmployer);
    const { matches } = this.state;

    return (
      <GridContainer>
        {matches(12).map((match, i) => {
          return (
            <Card key={`${match.lastName}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                  <CardPic src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <CardName>
                    {match.companyName}
                  </CardName>
                </CardHeader>
              </Link>
              <CardTitle>{match.jobTitle}</CardTitle>
              <ButtonsContainer>
                <Button>Archive</Button>
                <Button>Email</Button>
              </ButtonsContainer>
            </Card>
          )
        })}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getUserProfile })(SeekerMatches));
