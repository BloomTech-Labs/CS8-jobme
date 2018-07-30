import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers, toggleSeekerAvailability } from '../../actions';
import EmployerBrowseSeekerCard from './EmployerBrowseSeekerCard';
import { BrowseContainer } from '../styles/browseStyles'; 

class EmployerBrowseSeekers extends Component {
  state = {
    index: 0,
  }

  componentDidMount() {
    const token = localStorage.getItem('employerToken');
    this.props.getSeekers(token);
  }

  incrementIndex() {
    let { index } = this.state;
    let { availableSeekers } = this.props.seekers;

    // const token = localStorage.getItem('seekerToken');	
    index++;
    if (index >
      availableSeekers.length - 1) {
      // this.props.getJobs(token);
      // eventually you'll regret jobs after they are filtered
      // on the backend for now use below line
      this.props.toggleSeekerAvailability()
    } else {
      this.setState({ index })
    }
  }

  render() {
    return (
      <BrowseContainer>
        {this.props.seekers.outOfSeekers ?
          <div>
            Looks like there is no one left to hire :[
          </div>
          :
          <EmployerBrowseSeekerCard
            index={this.state.index}
            increment={this.incrementIndex.bind(this)}
          />
        }
      </BrowseContainer>
    )
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  { getSeekers, toggleSeekerAvailability }
)(EmployerBrowseSeekers);
