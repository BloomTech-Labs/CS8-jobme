import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
import loggedInSeeker from './loggedInSeeker';
import registerJobSeekerSuccess from './registerJobSeeker';

export default combineReducers({
  loggedInEmployer, registerEmployerSuccess, loggedInSeeker, registerJobSeekerSuccess,
});
