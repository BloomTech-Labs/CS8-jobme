const actionTypes = {
  // USER
  LOGIN_USER: {},
  LOGOUT_USER: {},
  REGISTER_USER: {},
  GET_USER_PROFILE: {},
  UPDATE_USER_PROFILE: {},
  // SEEKERS
  GET_SEEKERS: {},
  LIKE_SEEKER: {},
  GET_SEEKER_MATCHES: {},
  // JOBS
  GET_JOBS: {},
  LIKE_JOB: {},
  GET_JOB_MATCHES: {},
  // BILLING
  CHECKOUT: {},
  //
};

Object.keys(actionTypes).forEach((type) => {
  actionTypes[type].SUCCESS = `${type}_SUCCESS`;
  actionTypes[type].ERROR = `${type}_ERROR`;
  actionTypes[type].IN_PROGRESS = `${type}_IN_PROGRESS`;
});

actionTypes.CLEAR_STATE = 'CLEAR_STATE';

export default actionTypes;
