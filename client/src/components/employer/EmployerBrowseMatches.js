import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Container } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

import { getEmployerProfile } from '../../actions';

import styled from 'styled-components';


const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  justify-content: space-around;
`;
const Card = styled.div`
  width: 300px;
  border: 2px solid black;
  margin: 1% 0;
  padding-bottom: 15px;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Picture = styled.img`

`;
const Name = styled.div`
  font-size: 24px;
  font-color: black;
  text-indent: 20px;
`;
const Title = styled.div`
  font-size: 20px;
  font-color: black;
  padding: 10px 0;
  padding-left: 20px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  font-size: 22px;
  font-color: black;
  width: 120px;
`;



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
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');

    this.props.getEmployerProfile(token);
  }

  render() {
    // const { matches } = this.props.loggedInEmployer.profile;
    const {matches} = this.state;
    return (
        <StyledGrid>
          {matches(12).map((match, i) => {
            return (
            <Card key={`${match.lastName}${i}`}>
              <a className='card' href={`/matches/${i}`}>
                <CardHeader>
                  <Picture src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <Name>
                  {`${match.firstName} ${match.lastName}`}
                  </Name>
                </CardHeader>
              </a>
                <Title>{match.desiredTitle}</Title>
                <Buttons>
                  <Button>Archive</Button>
                  <a href={`mailto:${match.email}`} ><Button>Email</Button></a>
                </Buttons>
            </Card>
          )})}
        </StyledGrid>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getEmployerProfile })(EmployerBrowseMatches));
