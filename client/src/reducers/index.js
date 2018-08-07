import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';
import seekers from './seekers';
import error from './error';

export default combineReducers({
  error, user, jobs, seekers,
});
