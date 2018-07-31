import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';
import seekers from './seekers';

export default combineReducers({
  user, jobs, seekers,
});
