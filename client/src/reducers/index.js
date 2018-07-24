import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
<<<<<<< HEAD
import loggedInSeeker from './loggedInSeeker';
// Just wasted an hour because of this name difference...
export default combineReducers({ loggedInEmployer, registerEmployerSuccess, loggedInSeeker });
=======
import loggedInSeeker from './loggedInJobSeeker';
import registerJobSeeker from './registerJobSeeker';

export default combineReducers({
  loggedInEmployer, registerEmployerSuccess, loggedInSeeker, registerJobSeeker,
});
>>>>>>> Added actions/reducers/ui so job seekers can register
