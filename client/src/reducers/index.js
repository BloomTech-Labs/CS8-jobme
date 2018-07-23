import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
import loggedInSeeker from './loggedInJobSeeker';

export default combineReducers({ loggedInEmployer, registerEmployerSuccess, loggedInSeeker });
