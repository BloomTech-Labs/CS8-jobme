import React from 'react';
import { EmployerBrowseMatches, SeekerBrowseMatches } from '../components';

const Matches = () => {
  console.log('ATENTION', this);
  return (
    <div>
    { false ? <EmployerBrowseMatches /> : <SeekerBrowseMatches /> }
    </div>
  );
};

export default Matches;
