import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
import loggedInSeeker from './loggedInSeeker';
import registerJobSeekerSucess from './registerJobSeeker';

export default combineReducers({
  loggedInEmployer, registerEmployerSuccess, loggedInSeeker, registerJobSeeker,
});
