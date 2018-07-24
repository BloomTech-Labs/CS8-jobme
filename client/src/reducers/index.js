import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
import loggedInSeeker from './loggedInSeeker';
// Just wasted an hour because of this name difference...
export default combineReducers({ loggedInEmployer, registerEmployerSuccess, loggedInSeeker });
