const actionTypes = {
  // USER
  LOGIN_USER: {},
  LOGOUT_USER: {},
  REGISTER_USER: {},
  GET_USER_PROFILE: {},
  UPDATE_USER_PROFILE: {},
  UPDATE_USER_PHOTO: {},
  RESET_PASSWORD: {},
  // SEEKERS
  GET_SEEKER: {},
  LIKE_SEEKER: {},
  ARCHIVE_SEEKER: {},
  GET_SEEKER_MATCHES: {},
  // JOBS
  GET_JOBS: {},
  LIKE_JOB: {},
  ARCHIVE_JOB: {},
  GET_JOB_MATCHES: {},
  POST_JOB: {},
  EDIT_JOB: {},
  DELETE_JOB: {},
  // BILLING
  CHECKOUT: {},
  // MESSAGES
  GET_MESSAGES: {},
  SEND_MESSAGE: {},
  GET_CONVERSATIONS: {},
};

Object.keys(actionTypes).forEach((type) => {
  actionTypes[type].SUCCESS = `${type}_SUCCESS`;
  actionTypes[type].ERROR = `${type}_ERROR`;
  actionTypes[type].IN_PROGRESS = `${type}_IN_PROGRESS`;
});

actionTypes.CLEAR_STATE = 'CLEAR_STATE';
actionTypes.RETURNED_HOME = 'RETURNED_HOME';
actionTypes.CLOSE_MODAL = 'CLOSE_MODAL';

export default actionTypes;
