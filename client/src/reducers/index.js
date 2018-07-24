import { combineReducers } from 'redux';

import loggedInEmployer from './loggedInEmployer';
import registerEmployerSuccess from './registerEmployer';
<<<<<<< HEAD
import loggedInSeeker from './loggedInSeeker';
=======
import loggedInSeeker from './loggedInJobSeeker';
>>>>>>> 7b6e9a8006882cc3ee481c528dcf98e7f30db01d
import registerJobSeeker from './registerJobSeeker';

export default combineReducers({
  loggedInEmployer, registerEmployerSuccess, loggedInSeeker, registerJobSeeker,
});
