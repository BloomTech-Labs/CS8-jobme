import React from 'react';
import { SeekerBrowseJobs, EmployerBrowseSeekers} from '../components';

const Browse = () => {
  if (localStorage.getItem('seekerToken')) {
    return (
        <SeekerBrowseJobs/>
    );
  } else {
    return (
<EmployerBrowseSeekers/>
    )
  }

};

export default Browse;
