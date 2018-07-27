import React from 'react';
import { SeekerBrowseJobs } from '../components';

const Browse = () => {
  if (localStorage.getItem('seekerToken')) {
    return (
      <div>
        <SeekerBrowseJobs/>
      </div>
    );
  } else {
    return (
      <div>
        this is where the EmployerBrowseSeekers stuff will go
      </div>
    )
  }

};

export default Browse;
