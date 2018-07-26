import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
import loggedInSeeker from './loggedInSeeker';
import registerJobSeekerSuccess from './registerJobSeeker';
import jobs from './browseJobs';

export default combineReducers({
  loggedInEmployer, registerEmployerSuccess, loggedInSeeker, registerJobSeekerSuccess, jobs,
});
