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
  // JOBS
  GET_JOBS: {},
  LIKE_JOB: {},
  // BILLING
  CHECKOUT: {},
  //
};

Object.keys(actionTypes).forEach((type) => {
  actionTypes[type].SUCCESS = `${type}_SUCCESS`;
  actionTypes[type].ERROR = `${type}_ERROR`;
  actionTypes[type].IN_PROGRESS = `${type}_IN_PROGRESS`;
});

// actionTypes.LOGIN.SHOW_MODAL = 'LOGIN_SHOW_MODAL';
// actionTypes.LOGIN.HIDE_MODAL = 'LOGIN_HIDE_MODAL';
// actionTypes.REGISTER.SHOW_MODAL = 'REGISTER_SHOW_MODAL';
// actionTypes.REGISTER.HIDE_MODAL = 'REGISTER_HIDE_MODAL';

export default actionTypes;
