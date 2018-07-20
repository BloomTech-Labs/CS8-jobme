import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';

export default combineReducers({ loggedInEmployer, registerEmployerSuccess });
