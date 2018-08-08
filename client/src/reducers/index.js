import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';
import seekers from './seekers';
import error from './error';
import messages from './messages';

export default combineReducers({
  messages, error, user, jobs, seekers,
});
