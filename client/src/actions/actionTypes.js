const actionTypes = {
  LOGIN_EMPLOYER: {},
  LOGOUT_EMPLOYER: {},
  REGISTER_EMPLOYER: {},
  GET_EMPLOYER_PROFILE: {},
  LOGIN_SEEKER: {},
  LOGOUT_SEEKER: {},
  REGISTER_SEEKER: {},
  GET_SEEKER_PROFILE: {},
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
