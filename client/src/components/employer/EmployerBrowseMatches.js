import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEmployerProfile } from '../../actions';

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

class EmployerBrowseMatches extends Component {
  state = {
    matches: (n) => {
      const data = [];
      while (n > 0) {
        data.push(
          {
            firstName: 'Carl',
            lastName: 'Jung',
            desiredTitle: 'Cognitive Engineer',
            email: 'williamwinberg89@gmail.com'
          }
        );
        n--;
      }
      return data;
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('employerToken');
    this.props.getEmployerProfile(token);
  }

  render() {
    // const { submittedJobs } = this.props.loggedInEmployer.profile;
    // console.log('ATENTION', this.props.loggedInEmployer);
    const {matches} = this.state;

    return (
        <GridContainer>
          {matches(12).map((match, i) => {
            return (
            <Card key={`${match.lastName}${i}`}>
              <Link to={{ pathname: `/matches/${i}`}}>
                <CardHeader>
                  <CardPic src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <CardName>
                  {`${match.firstName} ${match.lastName}`}
                  </CardName>
                </CardHeader>
              </Link>
                <CardTitle>{match.desiredTitle}</CardTitle>
                <ButtonsContainer>
                  <Button>Archive</Button>
                  <Link to={{ pathname: `mailto:${match.email}`}} ><Button>Email</Button></Link>
                </ButtonsContainer>
            </Card>
          )})}
        </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getEmployerProfile })(EmployerBrowseMatches));
