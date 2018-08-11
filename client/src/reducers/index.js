import { combineReducers } from 'redux';

import user from './user';
import jobs from './jobs';
import seekers from './seekers';
import modal from './modal';
import messages from './messages';

export default combineReducers({
  messages, modal, user, jobs, seekers,
});
